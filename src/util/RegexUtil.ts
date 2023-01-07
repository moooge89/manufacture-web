export function parseDepartmentId(rawId: string): string {
  const regExp = new RegExp('^department-cdk-drop-(.*)$');

  const regRes = regExp.exec(rawId);

  if (!regRes || regRes.length < 1 || !regRes[1]) {
    return '';
  }

  return regRes[1];
}
