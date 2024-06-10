import tw, { styled } from 'twin.macro';

export const TooltipTitleWrraper = styled.div`
  ${tw`flex items-center mr-2`}
`;

export const StyledTooltipTypography = styled.span`
  ${tw`text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-pre-wrap`}
`;

export const ColoredTooltipTypography = styled.span`
  ${tw`[font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-nowrap text-gray-1000`}
`;

export const TooltipContentsWrraper = styled.div`
  ${tw`flex flex-row items-center justify-center bg-white min-w-0 w-full [border-radius: 8px] [text-align: center] [padding: 8px 12px 8px 12px] before:[content:''] before:absolute before:[bottom: -5px] before:[width: 10px] before:[height: 10px] before:bg-white before:rotate-45`}
`;

export const tooltipStyles = {
  buy: tw`[border-color: #7048E8] [border-width: 1px] border-solid before:[border-bottom-color: #7048E8] before:[border-bottom-width: 1px] before:[border-right-color: #7048E8]  before:[border-right-width: 1px] before:border-solid`,

  jeonsae: tw`[border-color: #FF542D] [border-width: 1px] border-solid before:[border-bottom-color: #FF542D] before:[border-bottom-width: 1px] before:[border-right-color: #FF542D]  before:[border-right-width: 1px] before:border-solid`,
};

export const Seperator = styled.div`
  ${tw`w-px h-2 bg-gray-300 [margin-right: 8px]`}
`;
