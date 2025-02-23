export enum ColorDeficiencyEnum {
    None = 'none',
    Protanopia = 'protanopia',
    Protanomaly = 'protanomaly',
    Deutranopia = 'deutranopia',
    Deuteranomaly = 'deuteranomaly',
    Tritanopia = 'tritanopia',
    Tritanomaly = 'tritanomaly',
    Achromatopsia = 'achromatopsia',
    Achromatomaly = 'achromatomaly'
}

export const ColorDeficiencyLabels: Record<ColorDeficiencyEnum, string> = {
    [ColorDeficiencyEnum.None]: 'Normal Vision',
    [ColorDeficiencyEnum.Protanopia]: 'Protanopia ', // (No Red)
    [ColorDeficiencyEnum.Protanomaly]: 'Protanomaly ', // (Partial Red weakness)
    [ColorDeficiencyEnum.Deutranopia]: 'Deuteranopia ', //
    [ColorDeficiencyEnum.Deuteranomaly]: 'Deuteranomaly (Partial Green weakness)', //(No Green)
    [ColorDeficiencyEnum.Tritanopia]: 'Tritanopia', //  (No Blue)
    [ColorDeficiencyEnum.Tritanomaly]: 'Tritanomaly', //  (Partial Blue weakness)
    [ColorDeficiencyEnum.Achromatopsia]: 'Achromatopsia ', // (Partial color - Desaturated)
    [ColorDeficiencyEnum.Achromatomaly]: 'Achromatomaly ' // (No Color)
};