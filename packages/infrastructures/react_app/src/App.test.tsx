describe("App Component test", () => {
  it("should render without crashing", () => {
    // 1) Génération
    const monTableau = ["élément 1", "élément 2", "élément 3"];
    const monTableauNull = null;

    // 2) Actions

    // 3) Assertions
    expect(monTableau).toHaveLength(3);
    expect(monTableau[0]).toBe("élément 1");
    expect(monTableau[1]).not.toBe("élément 3");
    expect(monTableauNull).toBeNull();
  });
});
