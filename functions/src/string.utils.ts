export const generateUniqueString = (): string => {
    function randString() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return randString() + randString();
};