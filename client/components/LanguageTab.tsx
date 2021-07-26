import {
  Text,
  Stack,
  HStack,
  Select,
  IconButton,
  Divider,
  Link,
} from "@chakra-ui/react";

import { FiClipboard, FiExternalLink } from "react-icons/fi";
import PrismTheme from "prism-react-renderer/themes/dracula";
import Highlight, { defaultProps } from "prism-react-renderer";

type UsesOption = {
  value: string;
  label: string;
};

type Install = {
  npm: string;
  yarn: string;
};

type Snippet = {
  install: Install;
  import: string;
  setup: string;
  usage: string;
  link: string;
};

type Props = {
  usesOptions: UsesOption[];
  selectedUse: string;
  selectedLanguage: string;
  currentSnippet: Snippet;
  /* eslint-disable-next-line */
  handleChangeSelectedUse: ({ target }: { target: any }) => void;
  handleCopyInstall: () => void;
  handleCopySetup: () => void;
  handleCopyUsage: () => void;
  handleCopyImport: () => void;
};

export function LanguageTab({
  usesOptions,
  selectedUse,
  selectedLanguage,
  handleChangeSelectedUse,
  currentSnippet,
  handleCopyInstall,
  handleCopySetup,
  handleCopyUsage,
  handleCopyImport,
}: Props) {
  return (
    <Stack spacing={4}>
      <Stack>
        <Text fontWeight="medium">1. Pick your use</Text>
        <Select
          size="md"
          value={selectedUse}
          onChange={handleChangeSelectedUse}
        >
          {usesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Stack>

      <Stack>
        <Text fontWeight="medium">2. Install</Text>
        <Highlight
          {...defaultProps}
          code={currentSnippet.install?.npm ?? "// No package install needed."}
          language={currentSnippet.install ? "bash" : "jsx"}
          theme={PrismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              as="pre"
              className={`${className} code`}
              minHeight={12}
              position="relative"
              spacing={4}
              style={{ ...style, padding: "4px 16px", borderRadius: "6px" }}
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

              {currentSnippet.install && (
                <IconButton
                  aria-label="Copy to clipboard"
                  className="prism-code--copy"
                  colorScheme="whiteAlpha"
                  icon={<FiClipboard />}
                  position="absolute"
                  right={4}
                  size="md"
                  top={1}
                  variant="ghost"
                  onClick={handleCopyInstall}
                />
              )}
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Stack>
        <Text fontWeight="medium">3. Setup</Text>
        <Highlight
          {...defaultProps}
          code={currentSnippet.setup ?? "// No setup needed."}
          language="jsx"
          theme={PrismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              as="pre"
              className={`${className} code`}
              minHeight={12}
              position="relative"
              spacing={4}
              style={{ ...style, padding: "4px 16px", borderRadius: "6px" }}
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

              {currentSnippet.setup && (
                <IconButton
                  aria-label="Copy to clipboard"
                  className="prism-code--copy"
                  colorScheme="whiteAlpha"
                  icon={<FiClipboard />}
                  position="absolute"
                  right={4}
                  size="md"
                  top={1}
                  variant="ghost"
                  onClick={handleCopySetup}
                />
              )}
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Stack>
        <Text fontWeight="medium">3. Import</Text>
        <Highlight
          {...defaultProps}
          code={currentSnippet.import ?? "// No import needed."}
          language="jsx"
          theme={PrismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              as="pre"
              className={`${className} code`}
              minHeight={12}
              position="relative"
              spacing={4}
              style={{ ...style, padding: "4px 16px", borderRadius: "6px" }}
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

              {currentSnippet.import && (
                <IconButton
                  aria-label="Copy to clipboard"
                  className="prism-code--copy"
                  colorScheme="whiteAlpha"
                  icon={<FiClipboard />}
                  position="absolute"
                  right={4}
                  size="md"
                  top={1}
                  variant="ghost"
                  onClick={handleCopyImport}
                />
              )}
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Stack>
        <Text fontWeight="medium">4. Usage</Text>
        <Highlight
          {...defaultProps}
          code={currentSnippet.usage}
          language={
            ["html", "vue"].includes(selectedLanguage) ? "markup" : "jsx"
          }
          theme={PrismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              _after={{ wordWrap: "break-word" }}
              _before={{ wordWrap: "break-word" }}
              as="pre"
              className={`${className} code`}
              display="block"
              minHeight={12}
              position="relative"
              spacing={4}
              style={{
                ...style,
                padding: "4px 16px",
                borderRadius: "6px",
                paddingTop: "12px",
              }}
              whiteSpace="pre"
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
              <IconButton
                aria-label="Copy to clipboard"
                className="prism-code--copy"
                colorScheme="whiteAlpha"
                icon={<FiClipboard />}
                position="absolute"
                right={4}
                size="md"
                top={1}
                variant="ghost"
                onClick={handleCopyUsage}
              />
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Divider />
      {currentSnippet.link && (
        <Link
          isExternal
          alignItems="center"
          d="inline-flex"
          href={currentSnippet.link}
        >
          <Text mr={2}>GitHub Repository</Text>
          <FiExternalLink />
        </Link>
      )}
    </Stack>
  );
}
