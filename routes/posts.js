var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    postController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    postController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    postController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    postController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    postController.remove(req, res);
});

module.exports = router;
