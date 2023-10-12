import { StackContext, NextjsSite, Config, use } from 'sst/constructs'
import { SsrDomainProps } from 'sst/constructs/SsrSite'
import { Database } from './Database'

const CUSTOM_DOMAIN: SsrDomainProps = {
  domainName: 'demo.2401.co',
  hostedZone: '2401.co',
}

export function Web({ stack }: StackContext) {
  const NEXTAUTH_SECRET = new Config.Secret(stack, 'NEXTAUTH_SECRET')
  const SITE_URL = new Config.Secret(stack, 'SITE_URL')
  const SMTP_HOST = new Config.Secret(stack, 'SMTP_HOST')
  const SMTP_PORT = new Config.Secret(stack, 'SMTP_PORT')
  const SMTP_USER = new Config.Secret(stack, 'SMTP_USER')
  const SMTP_PASS = new Config.Secret(stack, 'SMTP_PASS')
  const email = [SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER]
  const web = [NEXTAUTH_SECRET, SITE_URL]

  const { cluster } = use(Database)
  const { defaultDatabaseName: dbName, secretArn, clusterArn } = cluster
  const site = new NextjsSite(stack, 'site', {
    customDomain: stack.stage === 'prod' ? CUSTOM_DOMAIN : undefined,
    path: 'packages/web',
    bind: [...web, ...email, cluster],
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
