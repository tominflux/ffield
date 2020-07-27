const assert = require("assert")
const {
    FIELD_TYPE,
    JS_TYPE,
    fieldTypeToJsType,
    createField,
    validateField,
    updateField,
    cloneField, 
} = require("./index.js")


describe("Constants", () => {
    describe("FIELD_TYPE", () => {
        it("Has expected keys", () => {
            const keys = Object.keys(FIELD_TYPE)
            const keyCount = keys.length
            //Has 5 keys
            assert.equal(keyCount, 5)
            //Keys have expected names.
            assert(keys.includes("STRING") === true)
            assert(keys.includes("NUMBER") === true)
            assert(keys.includes("BOOLEAN") === true)
            assert(keys.includes("OBJECT") === true)
            assert(keys.includes("ARRAY") === true)
        })
        it("Has expected values", () => {
            assert.equal(FIELD_TYPE["STRING"], "STRING")
            assert.equal(FIELD_TYPE["NUMBER"], "NUMBER")
            assert.equal(FIELD_TYPE["BOOLEAN"], "BOOLEAN")
            assert.equal(FIELD_TYPE["OBJECT"], "OBJECT")
            assert.equal(FIELD_TYPE["ARRAY"], "ARRAY")
        })
    })
    describe("JS_TYPE", () => {
        it("Has expected keys", () => {
            const keys = Object.keys(JS_TYPE)
            const keyCount = keys.length
            //Has 4 keys
            assert.equal(keyCount, 4)
            //Keys have expected names.
            assert(keys.includes("STRING") === true)
            assert(keys.includes("NUMBER") === true)
            assert(keys.includes("BOOLEAN") === true)
            assert(keys.includes("OBJECT") === true)
        })
        it("Has expected values", () => {
            assert.equal(JS_TYPE["STRING"], "string")
            assert.equal(JS_TYPE["NUMBER"], "number")
            assert.equal(JS_TYPE["BOOLEAN"], "boolean")
            assert.equal(JS_TYPE["OBJECT"], "object")
        })
        it("Is true representation of JS data types", () => {
            const str = "Hello World"
            const nmb = 333
            const bln = true
            const obj = { msg: "Hello Universe" }
            const arr = [ 3, 6, 9, "Rule of Thirds" ]
            assert.equal(typeof str, JS_TYPE.STRING)
            assert.equal(typeof nmb, JS_TYPE.NUMBER)
            assert.equal(typeof bln, JS_TYPE.BOOLEAN)
            assert.equal(typeof obj, JS_TYPE.OBJECT)
            assert.equal(typeof arr, JS_TYPE.OBJECT)
        })
    })
})

describe("Type Converters", () => {
    describe("fieldTypeToJsType", () => {
        it("Converts all field types to anticipated js types.", () => {
            const ftStr = FIELD_TYPE.STRING
            const ftNmb = FIELD_TYPE.NUMBER
            const ftBln = FIELD_TYPE.BOOLEAN
            const ftObj = FIELD_TYPE.OBJECT
            const ftArr = FIELD_TYPE.ARRAY
            const jsStr = JS_TYPE.STRING
            const jsNmb = JS_TYPE.NUMBER
            const jsBln = JS_TYPE.BOOLEAN
            const jsObj = JS_TYPE.OBJECT
            const jsArr = JS_TYPE.OBJECT
            assert.equal(fieldTypeToJsType(ftStr), jsStr)
            assert.equal(fieldTypeToJsType(ftNmb), jsNmb)
            assert.equal(fieldTypeToJsType(ftBln), jsBln)
            assert.equal(fieldTypeToJsType(ftObj), jsObj)
            assert.equal(fieldTypeToJsType(ftArr), jsArr)
        })
    })
})


describe("Field Functions", () => {
    describe("validateField", () => {
        it("Throws no error for valid fields.", () => {
            const validFields = [
                { type: FIELD_TYPE.STRING, data: "Hello World" },
                { type: FIELD_TYPE.NUMBER, data: 333 },
                { type: FIELD_TYPE.BOOLEAN, data: true },
                { type: FIELD_TYPE.OBJECT, data: { msg: "Hello Universe" }},
                { type: FIELD_TYPE.ARRAY, data: [ 3, 6, 9, "Rule of Thirds" ]},
                { type: FIELD_TYPE.STRING, data: null }
            ]
            assert.doesNotThrow(() => validateField(validFields[0]))
            assert.doesNotThrow(() => validateField(validFields[1]))
            assert.doesNotThrow(() => validateField(validFields[2]))
            assert.doesNotThrow(() => validateField(validFields[3]))
            assert.doesNotThrow(() => validateField(validFields[4]))
            assert.doesNotThrow(() => validateField(validFields[5]))
        })
        it("Throws errors for all invalid fields.", () => {
            const invalidFields = [
                { type: FIELD_TYPE.STRING, data: 333 },
                { type: FIELD_TYPE.NUMBER, data: false },
                { type: FIELD_TYPE.BOOLEAN, data: "true" },
                { type: FIELD_TYPE.OBJECT, data: [ 3, 6, 9, "Rule of Thirds" ]},
                { type: FIELD_TYPE.ARRAY, data: { msg: "Hello Universe" }},
                { type: FIELD_TYPE.STRING },
                { data: "Hello World" },
                { type: FIELD_TYPE.STRING, data: "Hello World", xyz: "abc" },
                { type: null, data: "Hello World" },
                { type: FIELD_TYPE.STRING, data: undefined },
            ]
            assert.throws(() => validateField(invalidFields[0]))
            assert.throws(() => validateField(invalidFields[1]))
            assert.throws(() => validateField(invalidFields[2]))
            assert.throws(() => validateField(invalidFields[3]))
            assert.throws(() => validateField(invalidFields[4]))
            assert.throws(() => validateField(invalidFields[5]))
            assert.throws(() => validateField(invalidFields[6]))
            assert.throws(() => validateField(invalidFields[7]))
            assert.throws(() => validateField(invalidFields[8]))
            assert.throws(() => validateField(invalidFields[9]))
        })
        it("Throws no error for validators returning true.", () => {
            const field = { type: FIELD_TYPE.STRING, data: "Hello World." }
            const validators = [
                (field) => (field.data === "Hello World."),
                (field) => (true), 
                (field) => (field.data.includes("World"))
            ]
            assert.doesNotThrow(() => validateField(field, validators[0]))
            assert.doesNotThrow(() => validateField(field, validators[1]))
            assert.doesNotThrow(() => validateField(field, validators[2]))
        })
        it("Throws error for validators not returning true.", () => {
            const field = { type: FIELD_TYPE.STRING, data: "Hello World." }
            const validators = [
                (field) => (field.data === "Hello World #2."),
                (field) => (false), 
                (field) => (null), 
                (field) => (1),
                (field) => (undefined),
                (field) => ("true"),
                (field) => ({})
            ]
            assert.throws(() => validateField(field, validators[0]))
            assert.throws(() => validateField(field, validators[1]))
            assert.throws(() => validateField(field, validators[2]))
            assert.throws(() => validateField(field, validators[3]))
            assert.throws(() => validateField(field, validators[4]))
            assert.throws(() => validateField(field, validators[5]))
            assert.throws(() => validateField(field, validators[6]))
        })
        it("Throws error for validators that throw error.", () => {
            const field = { type: FIELD_TYPE.STRING, data: "Hello World." }
            const validators = [
                (field) => {
                    if (field.data !== "Hello World #2.") {
                        throw new Error(
                            `Field data does not say "Hello World #2."`
                        )
                    }
                    return true
                },
                (field) => { 
                    throw new Error(null) 
                }
            ]
            assert.throws(() => validateField(field, validators[0]))
            assert.throws(() => validateField(field, validators[1]))
        })
    })
    describe("createField", () => {
        it("Creates anticipated objects without error.", () => {
            const fieldType = FIELD_TYPE.STRING
            const fieldData = "Hello World"
            //Encounters no error
            assert.doesNotThrow(() => createField(fieldType, fieldData))
            //
            const field = createField(fieldType, fieldData)
            //Only has two properties.
            const properties = Object.keys(field)
            const propertyCount = properties.length
            assert.equal(propertyCount, 2)
            //Field type is as expected
            assert.equal(field.type, FIELD_TYPE.STRING)
            //Field data is as expected
            assert.equal(field.data, "Hello World")
            //
            assert.deepStrictEqual(
                field, { type: fieldType, data: fieldData}
            )
            //Field object is valid
            validateField(field)
        })
        it("Throws error when trying to create invalid field.", () => {
            assert.throws(() => createField(FIELD_TYPE.STRING, 33))
            assert.throws(() => createField("Not a field type", "Hello World"))
        })
    })
    describe("updateField", () => {
        it("Updates field with anticipated data", () => {
            const field = createField(FIELD_TYPE.STRING, "Hello world.")
            assert.doesNotThrow(() => updateField(field, "New Message"))
            assert.doesNotThrow(() => updateField(field, null))
            const updatedField = updateField(field, "New Message")
            const expectedField = {
                type: FIELD_TYPE.STRING,
                data: "New Message"
            }
            assert.deepStrictEqual(updatedField, expectedField)
        })
        it("Throws error when trying to update field with invalid data.", () => {
            const field = createField(FIELD_TYPE.STRING, "Hello world.")
            assert.throws(() => updateField(field, 33))
        })
    })
    describe("cloneField", () => {
        it("Clone is equal to original.", () => {
            const field = createField(FIELD_TYPE.STRING, "Hello World.")
            assert.doesNotThrow(() => cloneField(field))
            const clonedField = cloneField(field)
            assert.deepStrictEqual(clonedField, {
                type: FIELD_TYPE.STRING,
                data: "Hello World."
            })
        })
        it ("Throws error when trying to clone invalid field.", () => {
            const invalidField = { 
                type: FIELD_TYPE.STRING, data: 33
            }
            assert.throws(() => cloneField(invalidField))
        })
    })
})