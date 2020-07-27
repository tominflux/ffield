
/**
 * Field data types.
 */
const FIELD_TYPE = {
    STRING: "STRING",
    NUMBER: "NUMBER",
    BOOLEAN: "BOOLEAN",
    OBJECT: "OBJECT",
    ARRAY: "ARRAY"
}

/**
 * Representation of equivalent native JS types.
 */
const JS_TYPE = {
    STRING: "string",
    NUMBER: "number",
    BOOLEAN: "boolean",
    OBJECT: "object",
    ARRAY: "array"
}

const ftj = new Map([
    [FIELD_TYPE.STRING, JS_TYPE.STRING],
    [FIELD_TYPE.NUMBER, JS_TYPE.NUMBER]
    [FIELD_TYPE.BOOLEAN, JS_TYPE.BOOLEAN]
    [FIELD_TYPE.OBJECT, JS_TYPE.OBJECT]
    [FIELD_TYPE.ARRAY, JS_TYPE.ARRAY]
])

const jtf = new Map([
    [JS_TYPE.STRING, FIELD_TYPE.STRING],
    [JS_TYPE.NUMBER, FIELD_TYPE.NUMBER]
    [JS_TYPE.BOOLEAN, FIELD_TYPE.BOOLEAN]
    [JS_TYPE.OBJECT, FIELD_TYPE.OBJECT]
    [JS_TYPE.ARRAY, FIELD_TYPE.ARRAY]
])

/**
 * Convert field type to native js type.
 * @param {string} fieldType 
 * @returns {string}
 */
const fieldTypeToJsType = (fieldType) => {
    //Ensure given field type exists.
    if (!ftj.has(fieldType)) {
        throw new Error(
            `Field type to js type conversion ` +
            `error: Field type "${fieldType}" does not ` +
            `exist.`
        )
    }
    //
    return ftj.get(fieldType)
}

/**
 * Convert native js type to field type.
 * @param {string} jsType 
 * @returns {string}
 */
const jsTypeToFieldType = (jsType) => {
    //Ensure a conversion for given js type exists.
    if (!jtf.has(jsType)) {
        throw new Error(
            `Js type to field type conversion ` +
            `error: No conversion exists for js type ` +
            `"${jsType}".`
        )
    }
    //
    return jtf.get(jsType)
}

exports.FIELD_TYPE = FIELD_TYPE
exports.JS_TYPE = JS_TYPE
exports.fieldTypeToJsType = fieldTypeToJsType
exports.jsTypeToFieldType = jsTypeToFieldType

///////////
///////////


///////////
///////////

/**
 * Create a field object.
 * Native js type of fieldData must match equivalent
 * fieldType.
 * @param {string} fieldType Field's data type.
 * @param {*} fieldData Field's data content.
 */
const createField = (fieldType, fieldData) => {
    const creationErr = (msg) => new Error(
        `Field creation error: ${msg}`
    )
    //Ensure supplied field type exists.
    if (!FIELD_TYPE.includes(fieldType)) {
        throw creationErr(
            `Field type "${fieldType}" does not exist`
        )
    }
    //Ensure supplied data matches required type.
    //(null is exempt)
    const jsType = fieldTypeToJsType(fieldType)
    if (
        typeof fieldData !== jsType &&
        fieldData !== null
    ) {
        throw creationErr(
            `Field data's js type "${jsType}" does ` +
            `not match given field type "${fieldType}".`
        )
    }
    //Create and return field object.
    const field = {
        type: fieldType,
        data: fieldData
    }
    return field
}

/**
 * Validate a field object.
 * @param {{
 *  type: string,
 *  data: any
 * }} field Field object to validate.
 * @param {function} fieldValidator Functional field validator. (true = valid)
 */
const validateField = (field, fieldValidator=()=>true) => {
    const fieldJson = JSON.stringify(field)
    const validationErr = (msg) => new Error(
        `field validation error: ${msg}\n` +
        `${fieldJson}`
    )
    //Check that field has only 2 properties
    const properties = Object.keys(field)
    const propertyCount = properties.length
    if (propertyCount !== 2) {
        throw validationErr(
            `Field object has ${propertyCount} properties, ` +
            `expected 2.`
        )
    }
    //Check that field has "type" and "data" properties.
    if (!properties.includes("type")) {
        throw validationErr(
            `Field object does not have a "type" property.`
        )
    }
    if (!properties.includes("data")) {
        throw validationErr(
            `Field object does not have a "data" property.`
        )
    }
    //Check that js type of field data matches field type.
    //(null is exempt)
    const jsType = fieldTypeToJsType(field.type)
    if (
        typeof field.data !== jsType &&
        field.data !== null
    ) {
        throw validationErr(
            `Js type "${jsType}" of field's "data" property ` 
            `does not match its field type "${fieldType}".`
        )
    }
    //Run field validator.
    //If throws error, pass forward.
    //If returns false, null, or otherwise not true, throw error.
    try {
        const result = fieldValidator(field)
        if (result === false) {
            throw validationErr(
                `Field validator returned false.`
            )
        }
        if (result === null) {
            throw validationErr(
                `Field validator returned null.`
            )
        }
        if (typeof result !== true) {
            throw validationErr(
                `Field validator did not return true.`
            )
        }
    } catch (err) {
        throw validationErr(err.message)
    }
}

/**
 * Update the data of a field object.
 * (Performs validation on updated field object too.)
 * @param {{
 *  type: string,
 *  data: any
 * }} field Field object to update.
 * @param {*} newData New data to apply to field object.
 * @returns {{
 *  type: string,
 *  data: any
 * }} Updated field object.
 */
const updateField = (field, newData) => {
    //Create copy of field with new data applied.
    const newField = {
        ...field, 
        data: newData
    }
    //Perform basic validation of new field.
    validateField(newField)
    //Return new field
    return newField
}

/**
 * Clone a field object.
 * (Performs validation on cloned field object too.)
 * @param {{
 *  type: string,
 *  data: any
 * }} field Field object to clone.
 * @returns {{
 *  type: string,
 *  data: any
 * }} Cloned field object.
 */
const cloneField = (field) => {
    //Create copy of field.
    const copiedField = {
        ...field
    }
    //Perform basic validation of copied field.
    validateField(copiedField)
    //Return copied field
    return copiedField
}

exports.createField = createField
exports.validateField = validateField
exports.updateField = updateField
exports.cloneField = cloneField