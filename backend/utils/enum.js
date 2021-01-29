"use strict";

const ScoreResultEnum = { success: 1, fail: 2 };
const StatusEnum = { pending: 1, processing: 2, processed: 3 };

Object.freeze(ScoreResultEnum);
Object.freeze(StatusEnum);

export default { ScoreResultEnum, StatusEnum };
