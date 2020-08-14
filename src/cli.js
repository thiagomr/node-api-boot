const fs = require('fs');
const args = process.argv.slice(2);

const options = {
    action: args[0],
    name: args[1]
};

function getSanitizedName(name) {
    return name.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
}

function getClassName(name) {
    return name.replace(/(^\w{1})|(-{1}\w{1})/g, match => match.toUpperCase()).replace('-', '');
}

function getReplacedContent(content, className) {
    return content.replace(/Template/g, className);
}

function getTemplateContent(name) {
    return fs.readFileSync(`./templates/${name}.js`).toString();
}

function validateArgs(options) {
    if (!options.action) {
        throw new Error('missing param [action]');
    }

    if (!options.name) {
        throw new Error('missing param [name]');
    }

    if (!['controller', 'service', 'module'].includes(options.action)) {
        throw new Error ('invalid param [action]');
    }

    return;
}

function createFile(path, content) {
    return fs.writeFileSync(path, content);
}

function getGenerateOptions(action) {
    return {
        controller: ['controller', 'module'].includes(action) ? true : false,
        service: ['service', 'module'].includes(action) ? true : false,
    };
}

function checkIfExists(path) {
    if (fs.existsSync(path)) {
        throw new Error(`file already exists [${path}]`);
    }
}

(() => {
    try {
        validateArgs(options);

        const generateOptions = getGenerateOptions(options.action);
        const name = getSanitizedName(options.name);
        const className = getClassName(name);

        if (generateOptions.controller) {
            const controllerContent = getTemplateContent('controller');
            const replacedController = getReplacedContent(controllerContent, className);
            const path = `${process.env.PWD}/src/server/controllers/${name}-controller.js`;

            checkIfExists(path);
            createFile(path, replacedController);
        }

        if (generateOptions.service) {
            const serviceContent = getTemplateContent('service');
            const replacedService = getReplacedContent(serviceContent, className);
            const path = `${process.env.PWD}/src/lib/${name}.js`;

            checkIfExists(path);
            createFile(path, replacedService);
        }

        console.log('successfully generated files');
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
})();
