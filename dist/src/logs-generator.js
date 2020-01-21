const logsWritingLimit = parseInt(process.env.LOGS_WRITING_LIMIT) || 100 * 1000;
const stringSizeLimit = parseInt(process.env.STRING_SIZE_LIMIT) || 1 * 1024 * 1024;
for (let i = 0; i < logsWritingLimit; i++) {
    const stringSize = Math.ceil(Math.random() * Math.floor(stringSizeLimit));
    const longString = new Array(stringSize).fill("a").join("");
    console.log(`${i} string byte size: ${Buffer.byteLength(longString)} ${longString}`);
}
//# sourceMappingURL=logs-generator.js.map