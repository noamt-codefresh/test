const logsWritingLimit = parseInt(process.env.LOGS_WRITING_LIMIT) || 100 * 1000;
const stringSizeLimit = parseInt(process.env.STRING_SIZE_LIMIT) || 1 * 1024 * 1024;
console.log(`starting log generator, stringSizeLimit: ${stringSizeLimit}, logsWritingLimit: ${logsWritingLimit}`);
for (let i = 0; i < logsWritingLimit; i++) {
    const stringSize = Math.ceil(Math.random() * Math.floor(stringSizeLimit));
    const longString = new Array(stringSize).fill(`${i}/${logsWritingLimit}\n`).join("");
    console.log(`${i} string byte size: ${Buffer.byteLength(longString)} ${longString}\n`);
}
console.log("done.");
//# sourceMappingURL=logs-generator.js.map