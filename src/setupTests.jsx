import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// 각 테스트가 끝날 때마다 DOM을 깨끗하게 정리합니다.
afterEach(() => {
  cleanup();
});