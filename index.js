
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
 * Representation of native JS types.
 */
const JS_TYPE = {
    STRING: "string",
    NUMBER: "number",
    BOOLEAN: "boolean",
    OBJECT: "object"
}

const ftj = new Map([
    [FIELD_TYPE.STRING, JS_TYPE.STRING],
    [FIELD_TYPE.NUMBER, JS_TYPE.NUMBER],
    [FIELD_TYPE.BOOLEAN, JS_TYPE.BOOLEAN],
    [FIELD_TYPE.OBJECT, JS_TYPE.OBJECT],
    [FIELD_TYPE.ARRAY, JS_TYPE.OBJECT]
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

exports.FIELD_TYPE = FIELD_TYPE
exports.JS_TYPE = JS_TYPE
exports.fieldTypeToJsType = fieldTypeToJsType

///////////
///////////


//Ensure supplied data matches required type.
//(null is exempt)
const ensureFieldDataMatchesFieldType = (fieldType, fieldData) => {
    //Null is exempt.
    if (fieldData === null) {
        return
    }
    //Get expected JS type from field type,
    //and compare against "typeof" call
    const jsType = fieldTypeToJsType(fieldType)
    const fieldDataType = typeof fieldData
    const matchesJsType = (fieldDataType === jsType)
    if (!matchesJsType) {
        throw new Error(
            `Field data js type is "${fieldDataType}", ` +
            `expected "${jsType}"`
        )
    }
    //"typeof" call does not recognise arrays.
    //So separate check is needed.
    if (fieldType === FIELD_TYPE.ARRAY) {
        const isArray = Array.isArray(fieldData)
        if(!isArray) {
            throw new Error(
                `Field data is not an array, but field type is ` +
                `specified as "${FIELD_TYPE}"`
            )
        }
    }
    if (fieldType === FIELD_TYPE.OBJECT) {
        const isArray = Array.isArray(fieldData)
        if(isArray) {
            throw new Error(
                `Field data is an array, but field type is ` +
                `specified as "${FIELD_TYPE}"`
            )
        }
    }
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
        `Invalid field -- ${msg}\n` +
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
    //Ensure supplied field type exists.
    const includes = (obj, val) => {
        for (const key in obj) {
            if (obj[key] === val) {
                return true
            }
        }
        return false
    }
    if (!includes(FIELD_TYPE, field.type)) {
        throw validationErr(
            `Field type "${field.type}" does not exist`
        )
    }
    //Check that js type of field data matches field type.
    //(null is exempt)
    try {
        ensureFieldDataMatchesFieldType(field.type, field.data)
    } catch (err) {
        throw validationErr(
            `Field data's actual type does ` +
            `not match given field type "${field.type}".\n` +
            `${err.message}`
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
        if (result !== true) {
            throw validationErr(
                `Field validator did not return true.`
            )
        }
    } catch (err) {
        throw validationErr(err.message)
    }
}

/**
 * Create a field object.
 * Native js type of fieldData must match equivalent
 * fieldType.
 * @param {string} fieldType Field's data type.
 * @param {*} fieldData Field's data content.
 */
const createField = (fieldType, fieldData) => {
    //Create field object.
    const field = {
        type: fieldType,
        data: fieldData
    }
    //Perform basic field validation
    try {
        validateField(field)
    } catch (err) {
        throw new Error(
            `Field creation error: ${err.message}`
        )
    }
    //
    return field
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
    //Perform basic field validation
    try {
        validateField(newField)
    } catch (err) {
        throw new Error(
            `Field update error: ${err.message}`
        )
    }
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
    //Perform basic field validation
    try {
        validateField(field)
    } catch (err) {
        throw new Error(
            `Field clone error: ${err.message}`
        )
    }
    //Return copied field
    return copiedField
}

exports.createField = createField
exports.validateField = validateField
exports.updateField = updateField
exports.cloneField = cloneField