
const text = "Reddit <0100019cd2614dec-5016fb9a-9e84-42ce-9551-9b2aeeee3aba-000000@amazonses.com> \n 304108 is your code. Here is #19999 and #304108.";
const OTP_PATTERN = /(?<![\w\-@#])(?!(?:19|20)\d{2}(?![\w\-@#]))\d{4,8}(?![\w\-@#])/g;
console.log(text.match(OTP_PATTERN));

