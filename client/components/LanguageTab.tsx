import { Text, Link, Stack, Button, Select, HStack, useClipboard } from "@chakra-ui/react";

import PrismTheme from "prism-react-renderer/themes/dracula";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { FiClipboard, FiExternalLink, FiCopy } from "react-icons/fi";
import React from "react";

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
  content: string | Install;
};

type Metadata = {
  link: string;
};

type Snippet = {
  steps: Step[];
  metadata: Metadata;
};

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
  // constants
  const installSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Install")?.content;
  const setupSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Setup")?.content;
  const importSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Import")?.content;
  const usageSnippet = currentSnippet?.steps?.find((snippet) => snippet.label === "Usage")?.content;

  // chakra hooks
  const { onCopy: onCopyInstall, hasCopied: hasCopiedInstallSnippet } = useClipboard(installSnippet);
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

  return (
    <Stack flex={1} spacing={4}>
      {/* Display "Pick your use" */}
      <Stack>
        <Text fontSize={14} fontWeight="medium">
          1. Pick your use
        </Text>
        <Select size="sm" value={selectedUse} onChange={handleChangeSelectedUse}>
          {usesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Stack>

      {/* Display all the steps */}
      {currentSnippet?.steps.map((step, index) => {
        return (
          <Stack width={460} key={`${selectedLanguage}-${selectedUse}-${step.label}}`}>
            <HStack justifyContent="space-between">
              <Text fontSize={14}>
                {index + 2}. {step.label}
              </Text>
              <Button
                aria-label="Copy to clipboard"
                className="prism-code--copy"
                colorScheme="whiteAlpha"
                color="brand.grey"
                leftIcon={LABELS_HAS_COPIED[step.label] ? <FiCopy /> : <FiClipboard />}
                size="sm"
                variant="ghost"
                onClick={LABELS_METHODS[step.label]}
              >
                <Text fontSize={12}>{LABELS_HAS_COPIED[step.label] ? "Copied" : "Copy"}</Text>
              </Button>
            </HStack>
            <Highlight
              {...defaultProps}
              code={step.content?.npm ?? step.content}
              language={step.language}
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
                  }}
                >
                  {tokens.map((line, i) => (
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
