import { expect } from "chai";
import { Instruction } from "../../entity/Instruction"

describe('Instruction', function () {
    describe('#createInstruction', function () {
        it('should create the expected instruction', async function () {
            const instruction = new Instruction();
            instruction.text = "test text instruction";
            expect(instruction.text).to.eq("test text instruction");
        })
    })
})
