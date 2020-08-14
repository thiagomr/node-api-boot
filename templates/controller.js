class TemplateController {
    get(req, res) {
        try {
            return res.send({});
        } catch (e) {
            return res.status(500).send('server error');
        }
    }

    post(req, res) {
        try {
            return res.send({});
        } catch (error) {
            return res.status(500).send('server error');
        }
    }

    put(req, res) {
        try {
            return res.send({});
        } catch (error) {
            return res.status(500).send('server error');
        }
    }

    del(req, res) {
        try {
            return res.send({});
        } catch (error) {
            return res.status(500).send('server error');
        }
    }
}

module.exports = TemplateController;
