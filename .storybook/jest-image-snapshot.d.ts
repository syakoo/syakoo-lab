declare module "jest-image-snapshot" {
  export function toMatchImageSnapshot(options?: {
    customSnapshotsDir?: string;
    customSnapshotIdentifier?: string;
    failureThreshold?: number;
    failureThresholdType?: "percent" | "pixel";
    customDiffDir?: string;
    updatePassedSnapshot?: boolean;
  }): { message(): string; pass: boolean };
}
