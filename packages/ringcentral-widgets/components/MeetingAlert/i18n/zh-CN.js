import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: "请输入会议主题。",
  [meetingStatus.noPassword]: "请提供会议密码。",
  [meetingStatus.scheduledSuccess]: "会议已安排。"
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
