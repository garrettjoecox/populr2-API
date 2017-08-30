
const v: { [index:string] : Function } = {
  isType(value: any, name: string, type: string) {
    if (typeof value !== type) throw new Error(`${name} needs to be a ${type}`);
  },
  minLength(value: any, name: string, length: number) {
    if (value.length < length) throw new Error(`${name} needs to be at least ${length} characters long`);
  },
  isEmail(value: string, name: string) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value)) throw new Error(`${name} needs to be a valid email`);
  },
  enum(value: any, name: string, list: any[]) {
    if (!list.includes(value)) throw new Error(`${name} needs to be one of the following: ${list.join(',')}`);
  },
};

export default function validate(payload: { [index:string]: any }, properties: { [index:string]: any }) {
  for (const prop in properties) {
    const validations = properties[prop];

    if (!(prop in payload)) {
      if ('required' in validations && validations.required === true) {
        throw new Error(`${prop} is required`);
      } else {
        continue;
      }
    }

    for (const validation in validations) {
      const value = validations[validation];
      if (validation in v) {
        v[validation](payload[prop], prop, value);
      }
    }
  }
}
