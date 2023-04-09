export function parseDepartmentId(rawId: string): number {
  const regExp = new RegExp('^department-cdk-drop-(.*)$');

  const regRes = regExp.exec(rawId);

  if (!regRes || regRes.length < 1 || !regRes[1]) {
    return NaN;
  }

  return Number.parseInt(regRes[1]);
}
