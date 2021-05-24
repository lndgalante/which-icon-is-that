import { Text, Stack, HStack, Select, IconButton, Divider, Link } from '@chakra-ui/react';

import { FiClipboard, FiExternalLink } from 'react-icons/fi';
import PrismTheme from 'prism-react-renderer/themes/dracula';
import Highlight, { defaultProps } from 'prism-react-renderer';

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
        <Text fontWeight='medium'>1. Pick your use</Text>
        <Select size='md' value={selectedUse} onChange={handleChangeSelectedUse}>
          {usesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Stack>

      <Stack>
        <Text fontWeight='medium'>2. Install</Text>
        <Highlight
          {...defaultProps}
          theme={PrismTheme}
          code={currentSnippet.install?.npm ?? '// No package install needed.'}
          language={currentSnippet.install ? 'bash' : 'jsx'}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              as='pre'
              position='relative'
              spacing={4}
              minHeight={12}
              className={`${className} code`}
              style={{ ...style, padding: '4px 16px', borderRadius: '6px' }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}

              {currentSnippet.install && (
                <IconButton
                  position='absolute'
                  onClick={handleCopyInstall}
                  size='md'
                  variant='ghost'
                  colorScheme='whiteAlpha'
                  aria-label='Copy to clipboard'
                  className='prism-code--copy'
                  icon={<FiClipboard />}
                  right={4}
                  top={1}
                />
              )}
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Stack>
        <Text fontWeight='medium'>3. Setup</Text>
        <Highlight
          {...defaultProps}
          theme={PrismTheme}
          code={currentSnippet.setup ?? '// No setup needed.'}
          language='jsx'
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              as='pre'
              position='relative'
              spacing={4}
              minHeight={12}
              className={`${className} code`}
              style={{ ...style, padding: '4px 16px', borderRadius: '6px' }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}

              {currentSnippet.setup && (
                <IconButton
                  position='absolute'
                  onClick={handleCopySetup}
                  size='md'
                  variant='ghost'
                  colorScheme='whiteAlpha'
                  aria-label='Copy to clipboard'
                  className='prism-code--copy'
                  icon={<FiClipboard />}
                  right={4}
                  top={1}
                />
              )}
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Stack>
        <Text fontWeight='medium'>3. Import</Text>
        <Highlight
          {...defaultProps}
          theme={PrismTheme}
          code={currentSnippet.import ?? '// No import needed.'}
          language='jsx'
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              as='pre'
              position='relative'
              spacing={4}
              minHeight={12}
              className={`${className} code`}
              style={{ ...style, padding: '4px 16px', borderRadius: '6px' }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}

              {currentSnippet.import && (
                <IconButton
                  position='absolute'
                  onClick={handleCopyImport}
                  size='md'
                  variant='ghost'
                  colorScheme='whiteAlpha'
                  aria-label='Copy to clipboard'
                  className='prism-code--copy'
                  icon={<FiClipboard />}
                  right={4}
                  top={1}
                />
              )}
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Stack>
        <Text fontWeight='medium'>4. Usage</Text>
        <Highlight
          {...defaultProps}
          code={currentSnippet.usage}
          theme={PrismTheme}
          language={['html', 'vue'].includes(selectedLanguage) ? 'markup' : 'jsx'}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <HStack
              as='pre'
              position='relative'
              spacing={4}
              minHeight={12}
              display='block'
              whiteSpace='pre'
              _before={{ wordWrap: 'break-word' }}
              _after={{ wordWrap: 'break-word' }}
              className={`${className} code`}
              style={{ ...style, padding: '4px 16px', borderRadius: '6px', paddingTop: '12px' }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
              <IconButton
                position='absolute'
                onClick={handleCopyUsage}
                size='md'
                variant='ghost'
                colorScheme='whiteAlpha'
                aria-label='Copy to clipboard'
                className='prism-code--copy'
                top={1}
                right={4}
                icon={<FiClipboard />}
              />
            </HStack>
          )}
        </Highlight>
      </Stack>

      <Divider />
      {currentSnippet.link && (
        <Link href={currentSnippet.link} isExternal d='inline-flex' alignItems='center'>
          <Text mr={2}>GitHub Repository</Text>
          <FiExternalLink />
        </Link>
      )}
    </Stack>
  );
}
