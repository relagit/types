/**
 * Generated by RelaGit v{{VERSION}}
 *
 * DO NOT MODIFY THIS FILE DIRECTLY
 */

type action =
	| 'navigate'
	| 'all'
	| 'commit'
	| 'pull'
	| 'push'
	| 'repository_add'
	| 'repository_remove'
	| 'remote_fetch'
	| 'settings_update'
	| 'stash'
	| 'stash_pop';

type ParamsFromEventType<E extends action> = E extends 'commit'
	? [Repository, { message: string; description: string }]
	: E extends 'push'
	? [Repository]
	: E extends 'pull'
	? [Repository]
	: E extends 'navigate'
	? [Repository | undefined, GitFile | undefined]
	: E extends 'remote_fetch'
	? [Repository, { name: string; url: string; type: string }[]]
	: E extends 'repository_add'
	? [string]
	: E extends 'repository_remove'
	? [string]
	: E extends 'settings_update'
	? []
	: E extends 'stash'
	? [Repository]
	: E extends 'stash_pop'
	? [Repository]
	: E extends 'all'
	? unknown[]
	: [Repository];

type OptionTypes = 'string' | 'number' | 'boolean' | 'enum';

interface WorkflowOptions {
	name: string;
	id?: string;
	description?: string;
	hooks?: {
		[K in action]?: (event: K, ...params: ParamsFromEventType<K>) => Promise<void> | void;
	};
	options?: {
		[key: string]: {
			type: OptionTypes;
			description: string;
			placeholder?: string;
			values?: string[];
		};
	};
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore - this is a global variable
type BufferEncoding =
	| 'ascii'
	| 'utf8'
	| 'utf-8'
	| 'utf16le'
	| 'ucs2'
	| 'ucs-2'
	| 'base64'
	| 'latin1'
	| 'binary'
	| 'hex';

interface Context {
	Git: {
		ListBranches: (repository: Repository | undefined) => Promise<Branch[]>;
		Checkout: (repository: Repository | undefined, branch: string) => Promise<void>;
		CreateBranch: (repository: Repository | undefined, branch: string) => Promise<void>;
		PushWithOrigin: (repository: Repository | undefined, branch: string) => Promise<void>;
		Stash: (repository: Repository | undefined) => Promise<void>;
		ListStash: (repository: Repository | undefined) => Promise<Record<number, string[]>>;
		PopStash: (repository: Repository | undefined, stash: GitFile) => Promise<void>;
		RemoveStash: (repository: Repository | undefined, stash: GitFile) => Promise<void>;
		PreviousCommit: (repository: Repository | undefined, sha?: string) => Promise<string>;
		Show: (repository: Repository | undefined, file: string) => Promise<PastCommit | undefined>;
		ShowOrigin: (
			repository: Repository | undefined,
			file: string,
			treeish?: string,
			encoding?: BufferEncoding
		) => Promise<string | null>;
		Discard: (repository: Repository | undefined, file: GitFile) => Promise<void>;
		Content: (file: string, repository: string | undefined) => Promise<string>;
		Analyse: (repository: string | undefined, file: string) => Promise<void>;
		Status: (repository: string | undefined) => Promise<GitFile[]>;
		Commit: (
			repository: Repository,
			message: string | undefined,
			body?: string
		) => Promise<string | undefined>;
		Remote: (directory: string) => Promise<
			{
				name: string;
				url: string;
				type: string;
			}[]
		>;
		Branch: (repository: string | undefined) => Promise<string>;
		Revert: (repository: Repository | undefined, commit: string) => Promise<void>;
		Clone: (url: string, path: string) => Promise<void>;
		Blame: (
			repo: string,
			file: string
		) => Promise<
			{
				hash?: string | undefined;
				author?: string | undefined;
				date: Date;
				message?: string | undefined;
				line?: string | undefined;
			}[]
		>;
		Reset: (repository: Repository | undefined, ref: string) => Promise<void>;
		Push: (repository: Repository | undefined) => Promise<void>;
		Diff: (file: string, repository: string | undefined) => Promise<void>;
		Init: (path: string) => Promise<void>;
		Pull: (repository: Repository | undefined) => Promise<void>;
		Log: (repository: Repository) => Promise<LogCommit[]>;
	};
	Repository: Repository;
}

interface Repository {
	draft?: boolean;
	id: string;
	path: string;
	name: string;
	remote: string;
	branch: string;
	commit: string;
	ahead: number;
	behind: number;
	lastFetched?: number;
}

type GitStatus =
	| 'added'
	| 'modified'
	| 'deleted'
	| 'untracked'
	| 'unknown'
	| 'unmerged'
	| 'copied'
	| 'renamed'
	| 'type-changed';

interface PastCommit {
	hash: string;
	files: {
		filename: string;
		path: string;
		diff: {
			files: {
				path: string;
				chunks: unknown[];
				type: 'AddedFile' | 'ChangedFile' | 'DeletedFile' | 'RenamedFile';
			}[];
			type: string;
		};
		status: GitStatus;
	}[];
}

interface DraftCommit {
	files: string[];
}

interface LogCommit {
	hash: string;
	tag?: string;
	refs: string;
	from?: string;
	to?: string;
	branch?: string;
	author: string;
	date: string;
	message: string;
	files: number;
	insertions: number;
	deletions: number;
}

interface Commit {
	message: string;
	description: string;
	files: string[];
}

type Branch = {
	gitName: string;
	name: string;
	path: string;
	relativeDate: string;
	isRemote: boolean;
	hasUpstream: boolean;
};

interface GitFile {
	id: string;
	name: string;
	path: string;
	status:
		| 'added'
		| 'modified'
		| 'deleted'
		| 'untracked'
		| 'unknown'
		| 'unmerged'
		| 'copied'
		| 'renamed'
		| 'type-changed';
}

interface ThemeOptions {
	name: string;
	description?: string;
	accent?: string;
	main: string;
}

interface Themes {
	/**
	 * Construct a new theme
	 * @example
	 * import { Theme } from "relagit:themes";
	 *
	 * export default new Theme({...})
	 */
	Theme: new (options: ThemeOptions) => void;
}

type DElement = {
	tagName: string;
	attributes?: Record<string, string | undefined>;
	children?:
		| ((DElement | string)[] | string | DElement)
		| (() => (DElement | string)[] | string | DElement);
};

type MenuItem =
	| {
			type: 'item';
			label: string;
			disabled?: boolean;
			onClick?: () => void;
			accelerator?: {
				shift?: boolean;
				meta?: boolean;
				alt?: boolean;
				key: string;
			};
			color?: 'default' | 'danger';
	  }
	| {
			type: 'separator';
	  };

type Captures = Record<string, Rule>;

type GetOnigurumaUrl = () => Promise<Readonly<URL>> | Readonly<URL>;

type Rule = RuleDefinition | RuleInclude | RuleName;

interface Grammar {
	dependencies?: Array<string>;
	extensions: Array<string>;
	extensionsWithDot?: Array<string>;
	injections?: Record<string, Rule>;
	names: Array<string>;
	patterns: Array<Rule>;
	repository?: Record<string, Rule>;
	scopeName: string;
}

interface Options {
	getOnigurumaUrlFetch?: GetOnigurumaUrl | null | undefined;
	getOnigurumaUrlFs?: GetOnigurumaUrl | null | undefined;
}

interface RuleDefinition {
	applyEndPatternLast?: boolean;
	begin?: string;
	beginCaptures?: Captures;
	captures?: Captures;
	contentName?: string;
	end?: string;
	endCaptures?: Captures;
	injections?: Record<string, Rule>;
	match?: string;
	name?: string;
	patterns?: Array<Rule>;
	repository?: Record<string, Rule>;
	while?: string;
	whileCaptures?: Captures;
}

interface RuleInclude {
	begin?: string;
	end?: string;
	include: string;
	match?: string;
	name?: string;
}

interface RuleName {
	begin?: never;
	include?: never;
	match?: never;
	name: string;
}

type RecordType = {
	[key: string | symbol]: string | boolean | number | object | undefined;
};

interface Actions {
	/**
	 * Construct a new workflow runner
	 * @example
	 * import { Workflow } from "relagit:actions";
	 *
	 * export default new Workflow({...})
	 */
	Workflow: new (options: WorkflowOptions) => void;
	/**
	 * Define a new workflow runner
	 * @example
	 * import { defineWorkflow } from "relagit:actions";
	 *
	 * export default defineWorkflow({...})
	 */
	defineWorkflow: (options: WorkflowOptions) => WorkflowOptions;
	/**
	 * When run in a workflow, will return current information about the state of the application.
	 * @returns {Context}
	 */
	context: () => Context;
	notifications: {
		show: (props: {
			icon?: keyof typeof import('@primer/octicons');
			iconUrl?: string;
			title: string;
			description: string;
			level: 'info' | 'warning' | 'error' | 'success';
			timeout?: number;
			actions?: ({
				children: unknown;
				type: 'default' | 'brand' | 'danger' | 'outline' | 'positive';
				onClick?: () => void | Promise<void>;
				className?: string;
				disabled?: boolean;
				dedupe?: boolean;
				label: string;
			} & {
				dismiss?: boolean;
			})[];
		}) => number;
		hide: (id: number) => void;
	};
	codeview: {
		registerGrammar: (grammar: Grammar | Grammar[]) => void;
		onceLoaded: (cb: () => void) => Promise<void>;
	};
	app: {
		registerSettingsPane: (
			id: string,
			props: {
				children:
					| ((DElement | string)[] | string | DElement)
					| (() => (DElement | string)[] | string | DElement);
				name: string;
				icon: keyof typeof import('@primer/octicons');
			}
		) => void;
		getInstalledWorkflows: () => WorkflowOptions[];
	};
	menu: {
		extend: (type: string, items: MenuItem[]) => void;
	};
	/**
	 * A utility to generate CRON timings.
	 * @param time - Either a template string `'5 minutes'` or a number `5`.
	 * @returns - If a template string is passed, it returns a number. If a number is passed, it returns an object with the time in minutes, hours, days and months.
	 * @example
	 * cron`5 minutes` // returns 5
	 * cron`*\/5 * * * * *` // returns 5
	 */
	cron: (<T extends TemplateStringsArray | number>(
		time: T
	) => T extends number
		? {
				[key in 'seconds' | 'minutes' | 'hours' | 'days' | 'months']: number;
		  }
		: number) & {
		/**
		 * Schedule a function to run at specific times.
		 */
		schedule: (time: number, cb: () => void, proxy: RecordType) => void;
	};
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// NOTE: these are just here for prettier to not complain about unknown variables
// @ts-ignore
const Workflow = '',
	// @ts-ignore
	defineWorkflow = '',
	// @ts-ignore
	context = '',
	// @ts-ignore
	Theme = '',
	// @ts-ignore
	notifications = '',
	// @ts-ignore
	app = '',
	// @ts-ignore
	menu = '',
	// @ts-ignore
	codeview = '',
	// @ts-ignore
	cron = '';
/* eslint-enable @typescript-eslint/no-unused-vars */

declare module 'relagit:actions' {
	const { Workflow, defineWorkflow, context, notifications, app, menu, codeview, cron }: Actions;

	export { Workflow, defineWorkflow, context, notifications, app, menu, codeview, cron };

	export type OptionsType<
		T extends {
			[key: string]: {
				type: OptionTypes;
				description: string;
				placeholder?: string;
				values?: string[];
			};
		}
	> = {
		[key in keyof T]: T[key]['type'] extends 'string'
			? string
			: T[key]['type'] extends 'number'
			? number
			: T[key]['type'] extends 'boolean'
			? boolean
			: T[key]['type'] extends 'enum'
			? string
			: never;
	} & {
		_listener: (cb: (options: OptionsType<T>) => void) => void;
	};
}

declare module 'relagit:themes' {
	const { Theme }: Themes;

	export { Theme };
}
