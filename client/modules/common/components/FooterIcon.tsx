import { LinkBox, LinkOverlay, Icon, As } from "@chakra-ui/react";

type FooterIconProps = {
  icon: As;
  href: string;
  label: string;
  isEmail?: boolean;
  onClick?: () => void;
};

export function FooterIcon({ icon, href, label, isEmail, onClick }: FooterIconProps) {
  if (isEmail) {
    return (
      <Icon
        onClick={isEmail ? onClick : null}
        as={icon}
        cursor="pointer"
        color="brand.white"
        h={5}
        sx={{ ".footer-link:hover &": { color: "brand.softOrange" } }}
        transition="all 200ms ease-in-out"
        w={5}
      />
    );
  }

  return (
    <LinkBox cursor="pointer">
      <LinkOverlay isExternal aria-label={label} className="footer-link" href={href}>
        <Icon
          as={icon}
          color="brand.white"
          h={5}
          sx={{
            ".footer-link:hover &": {
              color: "brand.softOrange",
            },
          }}
          transition="all 200ms ease-in-out"
          w={5}
          mt={label === "Twitter" ? 1.5 :0}
        />
      </LinkOverlay>
    </LinkBox>
  );
}
