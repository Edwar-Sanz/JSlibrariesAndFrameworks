import Hello from "./Hello"

const hello = new Hello();

export const helloResolvers = {
  Query: {
    sayHello: hello.sayHello
  }
}