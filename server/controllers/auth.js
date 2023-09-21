/**
 * controllers in auth middlewares
 */

export const welcome = (req, res) => {
    res.json({
        data: 'hello from nodejs api from routes',
    })
};