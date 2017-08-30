
export function success(data: any) {
  return {
    data,
    status: 'success',
  };
}

export function fail(message: string) {
  return {
    message,
    status: 'fail',
  };
}

export function error(message: string = 'Uh oh, Something went wrong!') {
  return {
    message,
    status: 'error',
  };
}
