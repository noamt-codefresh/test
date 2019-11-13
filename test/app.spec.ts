import * as assert from "assert";

describe("Execution Mocha Test", () => {

    describe("execution mocha test", () => {

        before(() => {
            console.log("before test!")
        });

        it("should execute mocha test", () => {
            // Given
            const x = 1;

            // When
            const y = 1;

            //Then
            assert.equal([1, 2, 3].indexOf(4), -1);
        });

        after(() => {
            console.log("after testd");
        });

    });

});
