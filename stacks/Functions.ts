import { StackContext, Function } from 'sst/constructs'

export function Functions({ stack }: StackContext) {
  const func = new Function(stack, 'func', {
    handler: 'packages/functions/func.handler',
    runtime: 'nodejs18.x',
  })
  stack.addOutputs({
    functionName: func.functionName,
  })
}
