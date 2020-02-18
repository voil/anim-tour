export interface MaskPropertiesInterface {
  [key: string]: number|PositionPropertiesInterface|SizePropertiesInterface;
  position: PositionPropertiesInterface;
  size: SizePropertiesInterface;
  steps: number;
  padding: number;
}

export interface ScenarioPropertiesInterface {
  [key: string]: string|undefined|object;
  title: string;
  selector: string;
  description: string;
  before?: () => void;
  after?: () => void;
}

export interface PositionPropertiesInterface {
  [key: string]: number;
  x: number;
  y: number;
}

export interface TextPropertiesInterface {
  [key: string]: string;
  next: string;
  previous: string;
  finish: string;
}

export interface ObjectPropertiesInterface extends Object {
  x: number;
  y: number;
  offsetLeft: number;
}

export interface ElementInterface extends Element {
  src: string;
  offsetTop: number;
  offsetLeft: number;
  style: {
    borderLeftWidth: string;
    borderTopWidth: string;
    borderRightWidth: string;
    borderBottomWidth: string;
  };
}

export interface TypeTransitionInterface {
  [key: string]: string;
  x: string;
  y: string;
}

export interface SettingsTourInterface {
  [key: string]: number|boolean;
  durationCallback: number;
  isToolTipVisible: boolean;
}

export interface SettingsTooltipInterface {
  [key: string]: string;
  typePosition: string;
}

export interface SizePropertiesInterface {
  [key: string]: number;
  width: number;
  height: number;
}

export interface VelocityStrategyInterface {
  transition(
    startPosition: PositionPropertiesInterface,
    endPosition: PositionPropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void
  ): {
    position: PositionPropertiesInterface;
    end: boolean;
  };
}

export interface VelocityStrategyParamsInterface {
  [key: string]: VelocityStrategyInterface;
  'right-bottom': VelocityStrategyInterface;
  'right-top': VelocityStrategyInterface;
  'left-bottom': VelocityStrategyInterface;
  'left-top': VelocityStrategyInterface;
}

export interface ContextVelocityStrategyInterface {
  setStrtegy(strategy: string): void;
  handle(
    startPosition: PositionPropertiesInterface,
    endPosition: PositionPropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void
  ): {
    position: PositionPropertiesInterface;
    end: boolean;
  };
}

export interface SizeStrategyInterface {
  size(
    startSize: SizePropertiesInterface,
    endSize: SizePropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void
  ): {
    size: SizePropertiesInterface;
    end: boolean;
  };
}

export interface SizeStrategyParamsInterface {
  [key: string]: SizeStrategyInterface;
  'right-bottom': SizeStrategyInterface;
  'right-top': SizeStrategyInterface;
  'left-bottom': SizeStrategyInterface;
  'left-top': SizeStrategyInterface;
}
export interface ContextSizeStrategyInterface {
  setStrtegy(strategy: string): void;
  handle(
    startPosition: SizePropertiesInterface,
    endPosition: SizePropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void
  ): {
    size: SizePropertiesInterface;
    end: boolean;
  };
}

export interface ObjectInterface extends Object{
  left: number;
  top: number;
  bottom: number;
  right: number;
}

interface VersionInterface {
  version: any;
}

declare global {
  interface Window {
    opera: VersionInterface;
  }
}
