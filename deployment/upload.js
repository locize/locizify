const AWS = require('aws-sdk');
const awsCreds = require('./aws-credentials.json');
const fs = require('fs');

const deployType = process.env.DEPLOY_TYPE || 'dev';
const suffix = deployType === 'dev' ? '-dev' : '';

const bucketName = 'locize-cdn';
const distributioId = 'E2L4B83SR9TC0Z';

const s3 = new AWS.S3({
  accessKeyId: awsCreds.accessKeyId,
  secretAccessKey: awsCreds.secretAccessKey,
  region: awsCreds.region
});

function upload(fileEnding) {
  s3.upload({
    Bucket: bucketName,
    Key: `locizify${suffix}${fileEnding}`,
    Body: fs.createReadStream(`${__dirname}/../locizify${fileEnding}`),
    ContentType: 'application/javascript',
    Expires: 0,
    CacheControl: 'public, must-revalidate, proxy-revalidate, max-age=0'
  }, (err, data) => {
    if (err) return console.log(`locizify${suffix}${fileEnding} upload failed! `, err.stack);
    console.log(`locizify${suffix}${fileEnding} uploaded! `, data);
  });
}

upload('.js');
upload('.min.js');


if (distributioId) {
  var cloudfront = new AWS.CloudFront({
    accessKeyId: awsCreds.accessKeyId,
    secretAccessKey: awsCreds.secretAccessKey
  });

  var d = new Date();

  var params = {
    DistributionId: distributioId,
    InvalidationBatch: {
      CallerReference: `locizify-redeploy-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}-${d.getTime()}`,
      Paths: {
        Quantity: 1,
        Items: [
          '/locizify*'
        ]
      }
    }
  };

  cloudfront.createInvalidation(params, function(err, data) {
    if (err) return console.log('CloudFront invalidation failed! ', err.stack);
    console.log('CloudFront invalidation requested! ', data);
  });
}
