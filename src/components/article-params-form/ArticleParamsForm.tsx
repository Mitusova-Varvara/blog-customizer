import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type TArticleParamsForm = {
	FormArticleState: ArticleStateType;
	setFormArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	FormArticleState,
	setFormArticleState,
}: TArticleParamsForm) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(FormArticleState);
	const [formIsOpen, setFormIsOpen] = useState(false);

	const formToggle = () => {
		return setFormIsOpen((formIsOpen) => !formIsOpen);
	};

	const handleSelect = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const clearForm = () => {
		setFormState(defaultArticleState);
		setFormArticleState(defaultArticleState);
	};

	const applyForm = (e: FormEvent) => {
		e.preventDefault();
		setFormArticleState(formState);
	};

	useOutsideClickClose({
		rootRef: rootRef,
		isOpen: formIsOpen,
		onChange: setFormIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={formIsOpen} onClick={formToggle} />
			<aside
				ref={rootRef}
				onSubmit={applyForm}
				onReset={clearForm}
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							handleSelect('fontFamilyOption', value)
						}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='font-Size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							handleSelect('fontSizeOption', value)
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => handleSelect('fontColor', value)}></Select>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							handleSelect('backgroundColor', value)
						}></Select>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleSelect('contentWidth', value)}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
