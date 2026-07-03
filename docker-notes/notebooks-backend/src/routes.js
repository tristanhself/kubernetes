const express = require('express');
const { Notebook } = require('./models');
const mongoose = require('mongoose');
const notebookRouter = express.Router();

/*
const A = (req, res) => { ... }

notebookRouter.post('/', A);
*/

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Notebook not found. (Database Error)' });
    }

    next();
}


// Create New Notebooks: POST '/'
notebookRouter.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "'name' field is required." })
        }

        const notebook = new Notebook({ name, description});
        await notebook.save();
        res.status(201).json({ data: notebook });

    } catch {
        res.status(500).json({ error: err.message });
    }
});

// Get All Notebooks: GET '/'
notebookRouter.get('/', async (req, res) => {
    try {
        const notebooks = await Notebook.find();
        return res.status(200).json( { data: notebooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Single Notebook: GET '/:id' - localhost:8080/api/notebooks/<something>
notebookRouter.get('/:id', validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findById(req.params.id);

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found.' });
        }

        return res.status(200).json( { data: notebook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Single Notebook: PUT '/:id' - localhost:8080/api/notebooks/<something>
notebookRouter.put('/:id', validateId, async (req, res) => {
    try {
        const { name, description } = req.body;
      
        const notebook = await Notebook.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found.' });
        }

        return res.status(200).json( { data: notebook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Single Notebook: DELETE '/:id' - localhost:8080/api/notebooks/<something>
notebookRouter.delete('/:id', validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findByIdAndDelete(req.params.id);

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found.' });
        }

        return res.status(200).json({ data: 'Notebook deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
});

module.exports = {
    notebookRouter,
};