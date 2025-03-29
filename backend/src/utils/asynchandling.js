export const asynchandling = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};