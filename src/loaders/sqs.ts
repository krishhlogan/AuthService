import { SQS } from '@aws-sdk/client-sqs';

const getSQSClient = () => {
  var sqs = new SQS({
    // The key apiVersion is no longer supported in v3, and can be removed.
    // @deprecated The client uses the "latest" apiVersion.
    apiVersion: '2012-11-05',

    region: 'ap-south-1'
  });
  return sqs;
};

export default getSQSClient;