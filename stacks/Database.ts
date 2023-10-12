import { StackContext, RDS, Service } from 'sst/constructs'

/*
  TODO:
  - Configure db to have a public route (use existing vpc?)
    https://docs.sst.dev/constructs/RDS#using-existing-vpc

*/

export const Database = ({ stack }: StackContext) => {
  const cluster = new RDS(stack, 'db', {
    engine: 'postgresql13.9',
    defaultDatabaseName: 'postgres',
  })

  // const budibase = new Service(stack, 'budibase', {
  //   path: 'packages/services/budibase',
  //   architecture: 'x86_64',
  //   bind: [cluster],
  //   environment: {},
  // })

  stack.addOutputs({
    dbName: cluster.defaultDatabaseName,
    dbSecretArn: cluster.secretArn,
    dbResourceArn: cluster.clusterArn,
    dbSocketAddress: cluster.clusterEndpoint.socketAddress,
    // budibase: budibase.url,
  })

  return {
    cluster,
  }
}
