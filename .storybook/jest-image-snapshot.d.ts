declare module "jest-image-snapshot" {
  export function toMatchImageSnapshot(options?: {
    customSnapshotsDir?: string;
    customSnapshotIdentifier?: string;
    failureThreshold?: number;
    failureThresholdType?: "percent" | "pixel";
    storeReceivedOnFailure?: boolean;
    customReceivedDir?: string;
  }): { message(): string; pass: boolean };
}
