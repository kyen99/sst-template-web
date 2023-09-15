import { StackContext, NextjsSite, Config, use } from 'sst/constructs'
import { SsrDomainProps } from 'sst/constructs/SsrSite'
import { Database } from './Database'

/* TODO:
  - test domain name for prod
  - generate DATABASE_URL from secretArn

*/

const CUSTOM_DOMAIN: SsrDomainProps = {
  domainName: 'demo.purplesquirrel.io',
  hostedZone: 'purplesquirrel.io',
}

export function Web({ stack }: StackContext) {
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, 'GOOGLE_CLIENT_ID')
  const GOOGLE_CLIENT_SECRET = new Config.Secret(stack, 'GOOGLE_CLIENT_SECRET')
  const NEXTAUTH_SECRET = new Config.Secret(stack, 'NEXTAUTH_SECRET')
  const SITE_URL = new Config.Secret(stack, 'SITE_URL')
  const web = [
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET,
    SITE_URL,
  ]

  const { cluster } = use(Database)
  const { defaultDatabaseName: dbName, secretArn, clusterArn } = cluster
  const site = new NextjsSite(stack, 'site', {
    customDomain: stack.stage === 'prod' ? CUSTOM_DOMAIN : undefined,
    path: 'packages/web',
    bind: [...web],
    environment: {
      NEXTAUTH_URL:
        stack.stage === 'prod'
          ? CUSTOM_DOMAIN.domainName
          : 'http://localhost:3000',
      NEXTAUTH_SECRET: '650BED25-1B6E-4A48-AC57-2FF825EB3859',
      DB_SECRET_ARN: secretArn,
      DB_CLUSTER_ARN: clusterArn,
      DB_NAME: dbName,
    },
  })

  site.attachPermissions([
    'rds-data:ExecuteStatement',
    'rds-data:BeginTransaction',
    'rds-data:RollbackTransaction',
    'rds-data:CommitTransaction',
    'secretsmanager:GetSecretValue',
  ])

  stack.addOutputs({
    SiteUrl: site.url,
  })
}
