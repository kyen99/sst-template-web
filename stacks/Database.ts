import { StackContext, RDS, Config } from 'sst/constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'

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
  stack.addOutputs({
    dbName: cluster.defaultDatabaseName,
    dbSecretArn: cluster.secretArn,
    dbResourceArn: cluster.clusterArn,
    dbSocketAddress: cluster.clusterEndpoint.socketAddress,
  })

  return {
    cluster,
  }
}
