import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState } from 'react';

type TArticleParamsForm = {
	FormArticleState: ArticleStateType;
	setFormArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	FormArticleState,
	setFormArticleState,
}: TArticleParamsForm) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(FormArticleState);

	return (
		<>
			<ArrowButton isOpen={true} onClick={() => {}} />
			<aside className={styles.container}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={}
						options={fontFamilyOptions}
						onChange={}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='font-Size'
						options={fontSizeOptions}
						selected={}
						onChange={}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={}
						options={fontColors}
						onChange={}></Select>

					<Separator></Separator>

					<Select
						title='Цвет фона'
						selected={}
						options={backgroundColors}
						onChange={}></Select>
					<Select
						title='Ширина контента'
						selected={}
						options={contentWidthArr}
						onChange={}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
