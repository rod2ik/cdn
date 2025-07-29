import { DviCommand } from '../parser';
export default function (commands: AsyncGenerator<DviCommand>): AsyncGenerator<DviCommand, void, any>;
