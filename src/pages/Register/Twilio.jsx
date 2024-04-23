// 참고자료
// https://github.com/iamport/iamport-react-example/blob/master/manuals/CERTIFICATION.md
// https://velog.io/@dldmswjd322/node.js-twilio를-사용해-SMS-인증-구현하기
// https://www.peterkimzz.com/phone-validation-service-twilio-in-5-minutes

import twilio from 'twilio';

export default function Twilio() {
  this.accountSid = 'AC9400af563ea46b42b3255f287abXXXXX';
  this.authToken = '65406c430c90d00268ef9bf0720XXXXX';
  this.verifyServiceSid = 'VAaa47973652ccaabfc582ed8c1afXXXXX';

  this.client = twilio(this.accountSid, this.authToken);

  this.sendVerificationCode = function (options) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verifications.create({ to: options.to, channel: 'sms' });
  };

  this.checkVerificationCode = function (options) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verificationChecks.create({
        to: options.to,
        code: options.code,
      });
  };
}
