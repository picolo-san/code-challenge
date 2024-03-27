import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./index";

describe("testing 3 functions with n < 0", () => {
  test("testing sum_to_n_a with n = -3", () => {
    expect(sum_to_n_a(-3)).toEqual(0);
  });
  test("testing sum_to_n_b with n = -3", () => {
    expect(sum_to_n_b(-3)).toEqual(0);
  });
  test("testing sum_to_n_c with n = -3", () => {
    expect(sum_to_n_c(-3)).toEqual(0);
  });
});

describe("testing 3 functions with n === 0", () => {
  test("testing sum_to_n_a with n = 0", () => {
    expect(sum_to_n_a(0)).toEqual(0);
  });
  test("testing sum_to_n_b with n = 0", () => {
    expect(sum_to_n_b(0)).toEqual(0);
  });
  test("testing sum_to_n_c with n = 0", () => {
    expect(sum_to_n_c(0)).toEqual(0);
  });
});

describe("testing 3 functions with n > 0", () => {
  test("testing sum_to_n_a with n = 5", () => {
    expect(sum_to_n_a(5)).toEqual(15);
  });
  test("testing sum_to_n_b with n = 5", () => {
    expect(sum_to_n_b(5)).toEqual(15);
  });
  test("testing sum_to_n_c with n = 5", () => {
    expect(sum_to_n_c(5)).toEqual(15);
  });
});
