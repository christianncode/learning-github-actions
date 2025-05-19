import {describe, expect, test} from "vitest";
import {sum} from "@/utilities/sum";

describe("Testing sum function", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(8);
  });
});
