import { useState } from "react";
import { Text, Link, Stack, Button, Select, HStack, Radio, RadioGroup, useClipboard } from "@chakra-ui/react";

import PrismTheme from "prism-react-renderer/themes/dracula";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

import { FiClipboard, FiExternalLink, FiCopy } from "react-icons/fi";

type UsesOption = {
  value: string;
  label: string;
};

type Install = {
  npm: string;
  yarn: string;
};

type Step = {
  label: string;
  language: Language;
  content: string & Install;
};

type Metadata = {
  link: string;
};

type Snippet = {
  steps: Step[];
  metadata: Metadata;
};

type PackageManager = "npm" | "yarn";

type Props = {
  usesOptions: UsesOption[];
  selectedUse: string;
  selectedLanguage: string;
  currentSnippet: Snippet;
  /* eslint-disable-next-line */
  handleChangeSelectedUse: ({ target }: { target: any }) => void;
};

export function LanguageTab({
  usesOptions,
  selectedUse,
  selectedLanguage,
  handleChangeSelectedUse,
  currentSnippet,
}: Props) {
  // react hooks
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");

  // constants
  const installSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Install")?.content;
  const setupSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Setup")?.content;
  const importSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Import")?.content;
  const usageSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Usage")?.content;

  const shouldTrimLastLine = [
    "react-component-js",
    "react-component-ts",
    "react-native-component-js",
    "react-native-component-ts",
    "styled-component-js",
    "styled-component-ts",
    "chakra-ui",
    "optimized-svg",
    "vue-template",
  ].includes(selectedUse);

  // chakra hooks
  const { onCopy: onCopyInstall, hasCopied: hasCopiedInstallSnippet } = useClipboard(installSnippet?.[packageManager]);
  const { onCopy: onCopySetup, hasCopied: hasCopiedSetupSnippet } = useClipboard(setupSnippet);
  const { onCopy: onCopyImport, hasCopied: hasCopiedImportSnippet } = useClipboard(importSnippet);
  const { onCopy: onCopyUsage, hasCopied: hasCopiedUsageSnippet } = useClipboard(usageSnippet);

  // constants
  const LABELS_METHODS = {
    Install: onCopyInstall,
    Setup: onCopySetup,
    Import: onCopyImport,
    Usage: onCopyUsage,
  };

  const LABELS_HAS_COPIED = {
    Install: hasCopiedInstallSnippet,
    Setup: hasCopiedSetupSnippet,
    Import: hasCopiedImportSnippet,
    Usage: hasCopiedUsageSnippet,
  };

  // handlers
  function handleChangePackageManager(packageManager: PackageManager) {
    setPackageManager(packageManager);
  }

  return (
    <Stack flex={1} spacing={4}>
      {/* Display "Pick your use" */}
      <Stack>
        <Text fontSize={14} fontWeight="medium">
          1. Pick your use
        </Text>
        <Select borderRadius={4} size="sm" value={selectedUse} onChange={handleChangeSelectedUse}>
          {usesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Stack>

      {/* Display all the steps */}
      {currentSnippet?.steps.map((step, index) => {
        const { label, language, content } = step;

        const handleCopyMethod = LABELS_METHODS[label];
        const hasCopiedToClipboard = LABELS_HAS_COPIED[label];

        const isUsage = label === "Usage";
        const isContentPackageManager = Boolean(content?.npm);
        const sliceEndIndex = isUsage && shouldTrimLastLine ? -1 : undefined;

        return (
          <Stack width={460} key={`${selectedLanguage}-${selectedUse}-${label}}`}>
            <HStack justifyContent="space-between">
              <Text fontSize={14}>
                {index + 2}. {label}
              </Text>
              <Button
                aria-label="Copy to clipboard"
                className="prism-code--copy"
                colorScheme="whiteAlpha"
                color="brand.grey"
                leftIcon={hasCopiedToClipboard ? <FiCopy /> : <FiClipboard />}
                size="sm"
                variant="ghost"
                onClick={handleCopyMethod}
              >
                <Text fontSize={12}>{hasCopiedToClipboard ? "Copied" : "Copy"}</Text>
              </Button>
            </HStack>
            <Highlight
              {...defaultProps}
              code={isContentPackageManager ? content[packageManager] : content}
              language={language}
              theme={PrismTheme}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} code`}
                  style={{
                    ...style,
                    fontSize: "14px",
                    minHeight: "40px",
                    overflow: "scroll",
                    position: "relative",
                    padding: "0.65rem 1rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "#333333",
                  }}
                >
                  {isContentPackageManager && (
                    <RadioGroup
                      colorScheme="whiteAlpha"
                      mb={2}
                      onChange={handleChangePackageManager}
                      value={packageManager}
                    >
                      <Stack direction="row" spacing={6}>
                        <Radio value="npm">NPM</Radio>
                        <Radio value="yarn">Yarn</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                  {tokens.slice(0, sliceEndIndex).map((line, i) => (
                    /* eslint-disable-next-line */
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        /* eslint-disable-next-line */
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Stack>
        );
      })}

      {currentSnippet.metadata.link && (
        <Link isExternal alignItems="center" d="inline-flex" fontSize={14} href={currentSnippet.metadata.link}>
          <Text mr={2}>Official page</Text>
          <FiExternalLink />
        </Link>
      )}
    </Stack>
  );
}
