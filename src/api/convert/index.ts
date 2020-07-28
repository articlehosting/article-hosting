import { dump, read } from '@stencila/encoda';
import { Result } from 'true-myth';
import { ApiError } from '../../server/render-api-response';

const file = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Archiving and Interchange DTD v1.1 20151215//EN" "JATS-archivearticle1.dtd">
<article xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ali="http://www.niso.org/schemas/ali/1.0/" dtd-version="1.1" article-type="research-article" xml:lang="en">
<front>
<journal-meta>
<journal-id journal-id-type="nlm-ta">ijm</journal-id>
<journal-id journal-id-type="publisher-id">ijm</journal-id>
<journal-title-group>
<journal-title>International Journal of Microsimulation</journal-title>
</journal-title-group>
<issn pub-type="epub">1747-5864</issn>
<publisher>
<publisher-name>International Microsimulation Association</publisher-name>
</publisher>
</journal-meta>
<article-meta>
<article-id pub-id-type="publisher-id">00202</article-id>
<article-id pub-id-type="doi">10.34196/ijm.00202</article-id>
<article-categories>
<subj-group subj-group-type="heading">
<subject>Research article</subject>
</subj-group>
<subj-group subj-group-type="subject">
<subject>Taxes and benefits</subject>
</subj-group>
</article-categories>
<title-group>
<article-title>Gendered effects of the personal income tax: Evidence from a schedular system with individual filing in Uruguay</article-title>
</title-group>
<contrib-group>
<contrib contrib-type="author" corresp="yes" id="author-00001">
<name>
<surname>Bucheli</surname>
<given-names>Marisa</given-names>
</name>
<contrib-id contrib-id-type="orcid" authenticated="true">https://orcid.org/0000-0003-0159-4712</contrib-id>
<xref rid="aff1" ref-type="aff">1</xref>
<xref ref-type="corresp" rid="cor1">*</xref>
<email>marisa.bucheli@cienciassociales.edu.uy</email>
</contrib>
<contrib contrib-type="author" corresp="yes" id="author-00002">
<name>
<surname>Olivieri</surname>
<given-names>Cecilia</given-names>
</name>
<contrib-id contrib-id-type="orcid" authenticated="true">https://orcid.org/0000-0003-3388-0828</contrib-id>
<xref rid="aff1" ref-type="aff">1</xref>
<xref ref-type="corresp" rid="cor1">*</xref>
<email>cecilia.olivieri@cienciassociales.edu.uy</email>
</contrib>
<aff id="aff1">
<label>1</label>
<institution>Universidad de la Rep&#x00FA;blica</institution>
<addr-line>
<named-content content-type="city">Montevideo</named-content>
</addr-line>
<country>Uruguay</country>
</aff>
</contrib-group>
<author-notes>
<fn id="cor1"><p>*<bold>For correspondence:</bold> marisa.bucheli@cienciassociales.edu.uy; cecilia.olivieri@cienciassociales.edu.uy</p></fn>
</author-notes>
<pub-date publication-format="electronic" date-type="pub"><day>17</day><month>07</month><year>2020</year></pub-date>
<pub-date publication-format="print" date-type="pub"><season>Summer</season><year>2019</year></pub-date>
<pub-date pub-type="collection"><year>2019</year></pub-date>
<volume>12</volume>
<issue>2</issue>
<fpage>68</fpage>
<lpage>86</lpage>
<permissions>
<copyright-statement>&#x00A9; 2019, Bucheli and Olivieri</copyright-statement>
<copyright-year>2019</copyright-year>
<copyright-holder>Bucheli and Olivieri</copyright-holder>
<ali:free_to_read/>
<license xlink:href="http://creativecommons.org/licenses/by/4.0/">
<ali:license_ref>http://creativecommons.org/licenses/by/4.0/</ali:license_ref>
<license-p>This article is distributed under the terms of the <ext-link ext-link-type="uri" xlink:href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution License</ext-link>, which permits unrestricted use and redistribution provided that the original author and source are credited.</license-p>
</license>
</permissions>
<self-uri content-type="pdf" xlink:href="ijm-00202.pdf"/>
<abstract>
<p>This article analyses the gender differences in the Personal Income Tax in Uruguay. Although the tax code does not explicitly specify gender differences, the average tax rate varies among gendered household types. Using post-tax income data, we simulate the average tax rate of the household and estimate a zero-one inflated beta model -which properly addresses the fact that the average tax rate includes many zero data points- to analyse it. We find that household supported by a one-earner couple bear a higher tax burden than the ones supported by a dual-earner couple or a single parent. We interpret that these findings suggest that the tax serves as somewhat of an incentive towards equal gender time allocation within the family, which is consistent with gender equity. However the strengths of the tax system from the gender perspective are eroded by the possibility to opt for a (rarely used) joint filing.</p>
</abstract>
<kwd-group kwd-group-type="repec">
<title>JEL classification</title>
<kwd>C63</kwd>
<kwd>H22</kwd>
<kwd>H24</kwd>
<kwd>H31</kwd>
<kwd>J16</kwd>
</kwd-group>
<kwd-group kwd-group-type="author-generated">
<kwd>microsimulation</kwd>
<kwd>tax incidence</kwd>
<kwd>income tax</kwd>
<kwd>gender</kwd>
</kwd-group>
</article-meta>
</front>
<body>
<sec id="s1">
<title>1. Introduction</title>
<p>A strand of the literature on gender equity studies the role of public policies in mitigating or reinforcing asymmetrical gender behaviour. <xref ref-type="bibr" rid="bib30">Stotsky (1996)</xref> defined and identified explicit and implicit gender bias in tax policies, which are particularly relevant in the Personal Income Tax (PIT). Explicit bias arises from the tax code when it identifies and treats men and women differently. Implicit forms of gender bias refer to provisions in the tax systems that tend to generate different incentives for men than for women, due to the culture or socioeconomic arrangements.</p>
<p>Many of the empirical studies focus on the presence of implicit bias when the tax is assessed on the combined income of the couple, through joint filing (<xref ref-type="bibr" rid="bib34">Andrienko et al., 2015</xref>). Under this rule, the second earner (typically women) effectively pays a higher tax (on her income) than if she was taxed individually, because of increasing marginal rates. This pattern is criticized for different reasons. For example, it is at odds with policy recommendations derived from the optimal taxation perspective, in which individuals with higher labour supply elasticity should be less taxed. As married women have a more elastic labour supply than their spouses, tax rates on labour income should be lower for women than for men (<xref ref-type="bibr" rid="bib1">Alesina et al., 2011</xref>). Also, from a gender equity perspective, joint taxation discourages the participation of married women in the labour market and men&#x2019;s participation in unpaid domestic work, creating gender biases (<xref ref-type="bibr" rid="bib5">Apps and Rees, 2010</xref>; <xref ref-type="bibr" rid="bib6">Bach et al., 2013</xref>; <xref ref-type="bibr" rid="bib21">Guner et al., 2012</xref>).</p>
<p>Two additional issues enrich the discussion of the PIT from the feminist economic theory perspective. <xref ref-type="bibr" rid="bib23">Nelson (1991)</xref> claims that ignoring home production for the purpose of taxing personal income, not only discourages female participation in the labour market but has a negative effect on horizontal equity. Indeed, a dual earner couple has to purchase household services in the market or forgo leisure time compared with the traditional male breadwinner couple. Thus, a similar welfare level of a household may lead to a higher burden PIT for a dual than one earner couple. A similar argument holds when comparing male breadwinner and lone parent families. However, not all who advocate gender equity give support to taxes on home production because of distributive concerns, on the understanding that it would increase more the tax burden of low than high income households (<xref ref-type="bibr" rid="bib19">Grown and Valodia, 2010</xref>).</p>
<p>Another interesting point raised by <xref ref-type="bibr" rid="bib23">Nelson (1991)</xref> is that usually PIT does not consider dependents (people unable to support themselves) except children. This means an unfair treatment to a single taxpayer that supports a dependent (for example a disabled parent) compared to a one-earner couple that can benefit of the income-splitting allowed under joint taxation.</p>
<p>Besides, under a global income tax, gender bias may arise from the rules governing the allocation of shared capital income and the gender differences in the asset ownership (a review of this literature is presented in <xref ref-type="bibr" rid="bib4">Apps and Rees, 2009</xref>)</p>
<p>In this context, it is not surprising that feminist economics gives support to individual filing and an income tax regime that taxes every source separately (schedular income tax). However, <xref ref-type="bibr" rid="bib30">Stotsky, 1996</xref> and <xref ref-type="bibr" rid="bib13">Elson (2006)</xref> mention different source of gender bias that persist such as the rules governing the allocation of shared capital income, exemptions or other tax preferences. Besides, gender differences in labour market outcomes and assets ownership also produce gender bias in taxation.</p>
<p>In recent decades, there has been a trend in developed countries to reform their PIT systems to dual regimes (capital and labour taxed separately) with individual filing (<xref ref-type="bibr" rid="bib17">Genser and Reutter, 2007</xref>). It is expected that these reforms would diminish gender bias. However, gender tax burden differences may be observed even under individual filing and a schedular system as reported in several empirical studies (see <xref ref-type="bibr" rid="bib19">Grown and Valodia, 2010</xref>, for a survey). For example, <xref ref-type="bibr" rid="bib28">Rodr&#x00ED;guez Enriquez et al. (2010)</xref> find a gender gap in Argentina because women are more prone to be employed in occupations that are taxed at lower rates than occupations which tend to intensively employ males.</p>
<p>The purpose of this study is to analyse the gender differences in the PIT-to-income ratio in Uruguay. The PIT was created in 2007 when a left-coalition was running the administration for the first time in the Uruguayan history, and in 2013, it accounted for 10% of public revenue. The PIT was the result of a commitment during the campaign to improve the distributive effect of the tax system. The debate about tax reform did not raise issues related to gender equity and in fact, this is the first analysis that addresses it. However, the PIT design reflects the general spirit of the latest reforms in developed countries that help to mitigate gender biases. Labour income, pensions and capital income are subject to a differentiated schedule tax, with marginal progressive rates for the first and second sources and a flat rate for capital income. Individual filing is the norm but joint taxation is also allowed, and there are no explicit gender biases in the code.</p>
<p>Our study builds on the work on gender and taxation for several countries collected in <xref ref-type="bibr" rid="bib19">Grown and Valodia (2010)</xref> and the comparative study by <xref ref-type="bibr" rid="bib18">Grown and Komatsu (2015)</xref>. The main difference with the first of these studies is that we use actual data instead of simulations of representative agents. Compared to the second study, which uses survey data as in this paper, our main innovation is to use an econometric strategy for the analysis.</p>
<p>We use the Household Survey carried out in 2013 by the Statistical Office in Uruguay. The survey reports post-tax income. Therefore, we simulate taxes and contributions using the statutory rates in force in 2013, and we add them to the reported income in order to have a proxy of gross income. We estimate the average tax rate of the household as PIT-to-gross income ratio taking into account paid taxes and income of all household earners. As we work with a database of individuals, we assign the same tax rate to all household members.</p>
<p>We classify the households according to a combination of dimensions: whether or not the household head has a partner, employment status of the head and partner (if any), and whether or not it is an extended household. We are particularly interested in comparing the average tax rate in three typical cases: a) households supported by a male worker and a housewife who is not engaged in paid employment, b) households in which both members of the couple participate in the labour market, and c) households in which a single woman works in the labour market. We also compare households of non-employed individuals, ie, pensioners. We assess the effect of household type on the average tax rate by estimating a zero-one inflated beta model (ZOIB). This model properly addresses the fact that the average tax rate is a proportion with presence of zeros.</p>
<p>We find that, given per capita household income, the PIT incidence is higher for male breadwinner households than for dual earner households. Following <xref ref-type="bibr" rid="bib13">Elson (2006)</xref> and <xref ref-type="bibr" rid="bib20">Grown (2010)</xref>, we consider this result to be consistent with gender equality because it is in line with more equal gender time allocation within the family. However, male breadwinner households also bear a higher tax incidence than female breadwinner households with a dependent spouse. This gender difference mainly comes from their different structure of income sources. The households headed by a single female worker exhibit a lower PIT incidence mainly due to the high share of non-taxed sources in their household income. Finally, we do not find gender differences within pensioners.</p>
<p>These results are based on the assumption that everybody files taxes individually. This assumption is quite realistic because joint filing is rarely used. Joint filing has not been analysed in Uruguay and probably its non-use is partly due to lack of information. However, joint filing is preferable for households in which one spouse does not participate in the labour market and for a percentage of the households in which both members of the couple do. Thus, as a robustness check for the basic results, we estimate gender gaps under the assumption that households opt for joint filing when it allows them to pay lower taxes than under individual filing. Though gender equity is eroded, we come up with the same conclusions.</p>
<p>The main contributions of this work are a) the implementation of a new strategy to analyse the data in the study of gender and taxation and b) the presentation of evidence about the gendered differences in the PIT burden in a developing country which last decade passed a tax reform that follows the main guidelines of regimes in advanced economies.</p>
<p>The remainder of this study proceeds as follows. In the next section we provide a description of the Uruguayan economy, after that we present the data and methodology and then we report the main results of the analysis. In the final section we conclude.</p>
</sec>
<sec id="s2">
<title>2. Traits of Uruguayan economy</title>
<sec id="s2-1">
<title>2.1. A gendered socio-economic picture</title>
<p>At the beginning of the 20th century, the country had low fertility and high life expectancy compared to Latin American standards. Since then, fertility has decreased and life expectancy has increased, and Uruguay is now in an advanced stage of demographic transition. Around 14 per cent of the population is older than 64 years of age as compared to less than 7 per cent on average in Latin America (see <xref ref-type="table" rid="table1">Table 1</xref>).</p>
<table-wrap id="table1" position="float">
<label>Table 1.</label>
<caption><title>Socio-demographic characteristics</title></caption>
<table frame="hsides" rules="groups">
<thead>
<tr>
<th rowspan="2" align="left"></th>
<th colspan="4" align="left">Uruguay</th>
<th colspan="4" align="left">Latin american average</th>
</tr>
<tr>
<th align="left">All</th>
<th align="left">Women</th>
<th align="left">Men</th>
<th align="left">W/M</th>
<th align="left">All</th>
<th align="left">Women</th>
<th align="left">Men</th>
<th align="left">W/M</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Children per woman <sup><xref ref-type="table-fn" rid="T1_FN1">a/</xref></sup></td>
<td align="left"></td>
<td align="left">2.04</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
<td align="left">2.14</td>
<td align="left"></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Life expectancy <sup><xref ref-type="table-fn" rid="T1_FN1">a/</xref></sup></td>
<td align="left">77.0</td>
<td align="left">80.5</td>
<td align="left">73.3</td>
<td align="left">1.1</td>
<td align="left">74.8</td>
<td align="left">78.1</td>
<td align="left">71.5</td>
<td align="left">1.1</td>
</tr>
<tr>
<td align="left">Population older than 64 <sup><xref ref-type="table-fn" rid="T1_FN1">b/</xref>&#x00A0;<xref ref-type="table-fn" rid="T1_FN1">c/</xref></sup></td>
<td align="left">14.0</td>
<td align="left">16.5</td>
<td align="left">11.2</td>
<td align="left">1.5</td>
<td align="left">6.7</td>
<td align="left">7.5</td>
<td align="left">5.9</td>
<td align="left">1.3</td>
</tr>
<tr>
<td align="left">Years of education <sup><xref ref-type="table-fn" rid="T1_FN1">b/</xref>&#x00A0;<xref ref-type="table-fn" rid="T1_FN1">d/</xref></sup></td>
<td align="left">9.8</td>
<td align="left">10.2</td>
<td align="left">9.5</td>
<td align="left">1.1</td>
<td align="left">8.7</td>
<td align="left">8.7</td>
<td align="left">8.8</td>
<td align="left">1.0</td>
</tr>
<tr>
<td align="left">Participation rate <sup><xref ref-type="table-fn" rid="T1_FN1">b/</xref>&#x00A0;<xref ref-type="table-fn" rid="T1_FN1">c/</xref>&#x00A0;<xref ref-type="table-fn" rid="T1_FN1">e/</xref></sup></td>
<td align="left">76.1</td>
<td align="left">66.9</td>
<td align="left">85.7</td>
<td align="left">0.8</td>
<td align="left">68.5</td>
<td align="left">54.8</td>
<td align="left">82.6</td>
<td align="left">0.7</td>
</tr>
<tr>
<td colspan="9" align="left"><bold>Households structure</bold><sup><xref ref-type="table-fn" rid="T1_FN1">b/</xref>&#x00A0;<xref ref-type="table-fn" rid="T1_FN1">f/</xref></sup></td>
</tr>
<tr>
<td align="left">One person households</td>
<td align="left">21.9</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
<td align="left">11.0</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Couple without children</td>
<td align="left">17.2</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
<td align="left">9.0</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Couple with children</td>
<td align="left">33.2</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
<td align="left">39.9</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Lone-parent family</td>
<td align="left">12.0</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
<td align="left">11.9</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Extended households</td>
<td align="left">15.7</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
<td align="left">28.2</td>
<td align="left"></td>
<td align="left"></td>
<td align="left"></td>
</tr>
</tbody>
</table>
<table-wrap-foot>
<fn><p><italic>Source:</italic> CEPAL (2016) and World Bank (2016).</p></fn>
<fn id="T1_FN1" fn-type="general"><p><italic>Notes</italic>: a/ 2005&#x2013;2010; b/ 2010; c/ Percentage of population; d/ Population ages 25&#x2013;59; e/ Population ages 15&#x2013;64; f/ Percentage of households.</p></fn>
</table-wrap-foot>
</table-wrap>
<p>Also, the level of education of women, their labour force participation and their marital status have undergone a substantial change since the middle of the 20<sup>th</sup> century. Uruguay is among Latin American countries in which these processes are in the most advanced stage, in part because of differences in initial conditions. Uruguayan women have on average 10.2 years of schooling and their participation rate is 67 per cent whereas the Latin American averages are respectively 8.7 years and 55 per cent (see <xref ref-type="table" rid="table1">Table 1</xref>). Note that in Uruguay, female level of education is higher than male; this difference is even larger among workers because female labour participation increases with education. The socio-demographic changes have impacted household structures to the extent that they are substantially different from the Latin American average. Since the aging process is more advanced in Uruguay, there is a relatively high incidence of one person households (mostly elderly) and couples without children, as reported in <xref ref-type="table" rid="table1">Table 1</xref>. Another relevant characteristic is that the share of extended households is relatively low. In this paper we focus on non-extended households (84 per cent of all households). Single-parent households, majoritarily headed by an adult woman, are 12 per cent of total households.</p>
<p>In sum, this brief picture shows that women are very much involved in the economy, and thus they were affected by the creation of the Personal Income Tax. However, the effect of PIT is different for women and men if there are gender differences in factors such as labour market outcomes and evasion.</p>
<p>The average labour income is lower for men than women. Between 2006 and 2013, the gender gap ranged between 47% and 56% of male labour income (<xref ref-type="bibr" rid="bib8">Bucheli and Lara, 2018</xref>). Part of it is due to gender differences in time spent in labour market: working hours per week were on average 32 for women and more than 40 for men. Other portion is related to gender differences in labour income per hour: in 2006&#x2013;2013, the average value of (post-tax) per hour labour income gender gap oscillated around 6% of male labour income. Previous studies for Uruguay show that the gender gap subsists after controlling individual observable characteristics and that the discrimination measures have been stable in the last two decades (<xref ref-type="bibr" rid="bib3">Amarante et al., 2004</xref>; <xref ref-type="bibr" rid="bib9">Bucheli and Sanrom&#x00E1;n, 2005</xref>; <xref ref-type="bibr" rid="bib14">Espino, 2013</xref>; <xref ref-type="bibr" rid="bib15">Espino et al., 2014</xref>). These works find that the portion of the gender gap that is not explained by observable productive attributes (which is usually interpreted as a measure of discrimination) is on average more than 100% of the wage gap, and that there is evidence of a glass ceiling phenomena for the most educated women.</p>
<p>Part of the wage gap that is not explained by observable attributes is due to occupational segregation. However, a considerable wage gap subsists when job characteristics are controlled. According to <xref ref-type="bibr" rid="bib15">Espino et al. (2014)</xref>, also the level of segregation has been stable in the last decades. In 2006&#x2013;2013, women were less than 10% of employment in the construction sector, mining and manufacture of machinery and equipment whereas they were more than 90% in garment sector and more than 70% in health care, education and personal services. Besides salary work is higher among women than men (74% and 69% of female and male employment, respectively) whereas self-employment is lower (20% and 24%).</p>
<p>Finally, an important question as regards the PIT burden is to examine gender differences in evasion patterns. We have information about the incidence of non-contribution to social security among workers. As contributions are compulsory for all workers, lack of contribution is a good proxy of PIT evasion. The incidence of non-contribution declined from 35% to 26% of employment between 2006 and 2013. This decline may be explained by the combination of growth and the strengthening of controls of the Administration. During all the period, the incidence of lack of contribution was similar for women and men.</p>
</sec>
<sec id="s2-2">
<title>2.2. The Personal Income Tax</title>
<p>In 2004, for the first time in Uruguayan history, national elections were won by a left coalition. The new administration that entered into office in 2005 was strongly committed with the reduction of inequality and poverty, and to carry out reforms of the tax and benefits system. One of the main pledges during the political campaign was to increase tax progressivity without changing the average tax burden. In 2007 the government passed a Tax Reform that increased the weight of progressive direct taxes at the expense of indirect taxes. Besides introducing changes in the indirect tax system, the reform created a Personal Income Tax that reflected the spirit of the latest reforms that were proposed and debated in developed countries.</p>
<p>First, it was designed as an individual filing system without explicit gender bias. The possibility to opt for joint taxation was introduced in 2009 and is only allowed for labour income received by married couples or those in a consensual union. Though there is no information about the percentage of couples that choose this option, administrative records make it possible to estimate it. The Tax Office provides information of the number of tax units registered as taxpayers (including exempted and non-exempted ones) of the PIT labour income component. These tax units include workers that choose individual filing (<italic>ind_file =1,277,210</italic> in 2013) and couples that choose joint filing (<italic>joint_file =22,567</italic> in 2013). The number of individuals involved in the records was 1,332,344 (<italic>= ind_file +2*joint_file</italic>) in 2013. According to the Household Survey of 2013, 63% of workers lived with a partner. If we apply this proportion to Tax Office information we may estimate that in 2013 the records involved 416,538 (<italic>=(ind_file +2*joint_file)*0.63/2</italic>) couples. So, we estimate that only 5.4% of couples chose joint filing in 2013.</p>
<p>Second, PIT was conceived as a dual tax under which capital income was taxed at a flat rate whereas labour income and pensions were subjected to progressive rates. Some months after its introduction, litigious issues led to taking out pensions and creating a progressive tax specific to them. In this study we refer to the PIT, including on pensions. The government justified the dual income tax because of the difficulties of tracing non-domestic sources of income, the prevention of lobbying activities and the high risk of evasion (<xref ref-type="bibr" rid="bib7">Barreix and Roca, 2007</xref>). At the same time, it facilitates tax administration relating to ownership and splitting treatments (for pros and cons of dual income taxes, see <xref ref-type="bibr" rid="bib17">Genser and Reutter, 2007</xref>). With regard to the topic of concern in this study, a relevant characteristic of the dual structure is that a flat rate on capital income eliminates the incentive for capital income splitting between the household members, which has potential gender consequences.</p>
<p>Capital gains (derived from sales) and holding income (derived from the possession of assets) are taxed at a flat rate that varies between 3 per cent and 12 per cent depending on the source (interests, profits, etc.). Deductions are allowed for bad debts, real estate taxes, and the cost of renting. In most of the cases, there is a withholding agent. If not, advance payments and annual filings are required.</p>
<p>Pensions are subject to individual progressive taxation and there is no option for joint taxation. There are four marginal rates that range from zero to 25 per cent. Tenants are allowed to subtract 6 per cent of their rent and no other deductions are allowed. The agencies that administer the Social Security System are the withholding agents responsible for collection and payment of the tax. When receiving pensions from different agencies, the taxpayer must do an annual filing.</p>
<p>Taxes on labour income have to be paid monthly in the case of employees (held at source) and bimonthly in the case of the self-employed. An annual filing is required except in the case of employees with only one job and eventual disparities should be closed out. The tax is equal to a primary tax minus tax credits.</p>
<p>The primary tax is calculated by applying the rate on the gross earnings of wage earners and on 70 per cent of gross income of the self-employed. The tax schedule has seven marginal rates ranging from zero to 30 per cent.</p>
<p>The tax credits are comprised of worker contributions and taxes levied on labour income, a fixed amount per child (higher in the case of a disabled child) and mortgage payments when the house is used for permanent residence and its cost is lower than a threshold. The tax credit for children can be distributed between parents. When parents are divorced and they do not agree about this distribution, each one can deduct 50 per cent. In order to calculate the amount of the tax credit, a progressive rate schedule applies that ranges from 10 per cent in the first bracket to 30 per cent in the sixth. After subtracting these tax credits, tenants are allowed to additionally subtract 6 per cent of their rent. If this deduction generates a surplus, this surplus is not refunded by the tax office and cannot be transferred to the following year.</p>
<p>In <xref ref-type="fig" rid="fig1">Figure 1</xref> we show the tax burden by monthly income according to the statutory rates under individual filing. We graph the cases of pensioners and four types of workers, in order to take into account that the tax-to-labour income ratio depends on the feasibility of using tax credits. We only show the tax burden for income below US$ 8000, although this amount falls inside the fifth bracket of the primary tax on labour earnings. A level of income (wage or pension) over US$ 8,000 is rarely observed as shown by the overlapped vertical lines. Dotted lines indicate the 75th, 90th and 99th percentiles of the distribution of pensions and continuous lines indicate the same percentiles of the distribution of labour income.<sup>[<xref ref-type="fn" rid="fn1">1</xref>]</sup></p>
<fig id="fig1" position="float" fig-type="figure">
<label>Figure 1.</label>
<caption><title>Personal Income Tax burden by income for selected individual types.</title></caption>
<graphic xlink:href="ijm-00202-fig001.tif"/>
</fig>
<p>As shown in <xref ref-type="fig" rid="fig1">Figure 1</xref>, pensioners are exempt up to about US$ 1,000 per month. The labour earnings schedule starts after a tax-free allowance of about US$ 900 but a single worker (who faces the highest burden among workers) pays taxes only when gross earnings exceed US$ 1,100 because of tax credits. The actual applicability of these thresholds can be observed in the vertical lines. According to estimations by <xref ref-type="bibr" rid="bib11">Burd&#x00ED;n et al. (2015)</xref> based on tax records, in 2012 only 20.1 per cent of pensioners and 33.6 per cent of workers paid the PIT.</p>
<p>For most income levels, the tax burden is higher for pensioners than workers because tax credits are allowed for labour earnings but there is no tax-free threshold for pensions. Among workers, the highest burden corresponds to a single person without children followed by a single person with one child. To calculate the tax burden of a single parent worker with one child we assumed that he/she makes 100 per cent use of the child deduction. The tax burden is a bit lower when the parent of a child is married or in union. Although there are no explicit legal differences, the single worker pays a higher share of income as PIT because contributions to the health system (eligible for tax credits) are lower for them than for married people. Finally, the lowest burden corresponds to a married worker with a child who is paying a mortgage equal to the maximum permitted value for the tax credit.</p>
<p>Source: author&#x2019;s calculations based on tax schedule rates.</p>
<p>Note: Dotted vertical lines indicate the 75th, 90th and 99th percentiles of the distribution of pensions and solid vertical lines indicate the same percentiles of the distribution of labor income</p>
<p>To analyse joint filing we calculated the tax burden for selected couples. Specifically, we calculated taxes that would be paid under joint and under individual filing for couples with same labour market income but different participation of each spouse in its generation. We assumed that there are no children or mortgage credits. In <xref ref-type="fig" rid="fig2">Figure 2</xref> we show the average tax rate paid by the couple for chosen income levels (which are indicated close to the curves) that reflect different position in the labour income distribution of couples: US$ 1,200 (close to percentile 12), 1,800 (22), 3,000 (43), 4,800 (66), 7,200 (83), 10,200 (92), 15,000 (97).</p>
<fig id="fig2" position="float" fig-type="figure">
<label>Figure 2.</label>
<caption><title>Personal Income Tax-to-income ratio for selected couples by participation of one spouse in generating labour income.</title></caption>
<graphic xlink:href="ijm-00202-fig002.tif"/>
</fig>
<p>The solid lines depict the path of the tax burden under individual filing as the participation of one spouse in labour market income generation rises. Participation ranges from 0 to 50 per cent, so unsurprisingly the curves are decreasing (or at least non-increasing), reflecting the advantages of sharing labour market activities between spouses.</p>
<p>Source: author&#x2019;s calculations based on schedule rates.</p>
<p>Note: The tax burden is calculated for different levels of couples&#x2019; labour income: US$ 1,200 (close to percentile 12 of the labor income distribution of couples), 1,800 (22), 3,000 (43), 4,800 (66), 7,200 (83), 10,200 (92), 15,000 (97). Dotted lines represent the tax burden under joint filing; solid lines represent the tax burden under individual filing.</p>
<p>The dotted lines show the pattern of the tax burden with one spouse generating labour income under joint filing. We observe that all the joint filing curves show a one-step fall. This is easily explained. The tax schedule under joint filing distinguishes two cases: one is applied when the earnings of at least one spouse are below a threshold (12 times annual minimum wage) and the other one when earnings of both spouses exceed the threshold.</p>
<p>For all levels of labour income of the couples, when only one spouse participates in the labour market, the tax burden of the couple is lower under joint than individual filing. As seen in <xref ref-type="fig" rid="fig2">Figure 2</xref>, this holds for the lowest values of the x-axis.</p>
<p>Although the figure does not reflect all possible situations, a first look suggests that the code does not encourage uneven labour market participation between spouses to reach a level of income. Indeed, the most interesting aspect of the curves is that if the couple chooses the least burdensome option (given income), the resulting curve is non-increasing, reflecting that there are advantages to sharing labour market time between spouses, or at least that there are not disadvantages.</p>
<p><xref ref-type="fig" rid="fig2">Figure 2</xref> also helps to illustrate a gender related issue discussed by <xref ref-type="bibr" rid="bib23">Nelson (1991)</xref>: dedication of women to household services may be encouraged because of the non-recognition of home production as a taxable income. When only one spouse participates in the labour market, household services are provided by the other spouse without facing a burden tax. Meanwhile, the two-earner couple can reach higher levels of labour income and therefore bear a higher burden tax, though it would need for money to pay for market goods to replace home production. For all the income levels reported in <xref ref-type="fig" rid="fig2">Figure 2</xref>, we find that the tax burden faced by a one earner couple under joint taxation is lower than the burden faced a by two-earner couple that generates twice as much as the former.</p>
</sec>
</sec>
<sec id="s3">
<title>3. Data and methods</title>
<sec id="s3-1">
<title>3.1. Data and imputations</title>
<p>We use the Household Survey (ECH because of the Spanish abbreviation of Encuesta Continua de Hogares) carried out in 2013 by the National Statistical Office (INE, following the Spanish abbreviation Instituto Nacional de Estad&#x00ED;stica). It is a nation-wide representative survey that reported information of 46,622 households (89.3 per cent response rate). Among several characteristics of household members, it registers post-tax in-kind and monetary income received in the month before the interview, by source.</p>
<p><xref ref-type="bibr" rid="bib35">Burdin et al., 2014</xref> assess the accuracy of the ECH comparing its information with Tax Office records for the period 2009&#x2013;2011. To estimate gross income based on ECH, they follow a procedure quite similar to the one used in this paper and described below. They conclude that the ECH underestimates capital income but it is fairly accurate to measure labour income and pensions, though top incomes are not well registered. The ratio between capital income reported by ECH and administrative records had a decreasing trend in the period of study; it was on average 73% but only 48% in 2011. The difference was very important among high income individual for which capital income is noticeable underestimated in data survey. Meanwhile, the average ratio for 2009&#x2013;2011 was 88% for pensions and 104% for labour income. It is worth to note that in the case of labour income data of the ECH, they only considered the information given by workers who declared to pay contributions of the Social Security System. In other words, they assumed that contributors pay PIT and workers that pay PIT are contributors.</p>
<p>Our variable of interest is the household tax rate measured as household PIT-to-(gross) income ratio. As the ECH asks about income after taxes and contributions, we estimated the individual taxes and contributions using the statutory rates in force in 2013, and we added them to the reported individual income in order to have a proxy of gross income. Then, we calculated the income and the paid PIT of the household adding information of its members, and finally, the household tax rate. We assigned to individuals their household tax rate.</p>
<p>In the case of capital income, we computed the taxable capital gains as the sum of all reported capital income and we assumed that there is no evasion. The ECH does not provide information to estimate tax deductions so we implicitly assumed that conditions for them were not present. This assumption should be tested in the future; anyway, the most important concern related to capital income is the underreporting.</p>
<p>The ECH reports whether or not the worker contributes to the Social Security System. We assumed that there is no partial evasion by contributors and that non-contributors do not pay taxes either<sup>[<xref ref-type="fn" rid="fn2">2</xref>]</sup> as in <xref ref-type="bibr" rid="bib35">Burdin et al., 2014</xref>. Because of the findings by Vigorito &#x0026; Esponda when comparing ECH and Tax Office records, we expect that this is a reasonable assumption to estimate gross labour income of workers who do not evade their PIT payments. However we cannot assess the accuracy of labour income reported in the survey by evaders. Regarding PIT credits, we considered contributions and child benefits, but we did not impute deductions related to mortgages and rents due to the lack of information for an appropriate assumption. Credits for children were assigned to the head of the household who is usually the household member who receives the highest income.</p>
<p>When estimating the amount of PIT paid we assumed that individuals opt for individual filing because joint filing is rarely used. Besides, the survey does not provide any information that would help distinguish couples that used different options. Thus, we performed a first analysis using estimations of gross income and PIT based on individual filing. Then, to analyse the effect of the joint filing option we estimated the amount of PIT under joint filing given the already estimated gross income.</p>
<p>To analyse sources of income we deflated them by the Consumer Price Index and classified them into four groups: capital income, labour income, other income (public and private transfers plus self-consumption), and imputed rental value of owner-occupied houses).</p>
</sec>
<sec id="s3-2">
<title>3.2. Gendered classification of the population</title>
<p>Personal income taxes are generally applied to individuals. However, studies on inequality and distributive effects of taxes chose the household as the proper unit of analysis under the understanding that household members share income and other resources. As our focus is the analysis of gendered distributive effects, the challenge is to provide an appropriate gender classification of households. To address the issue about the effects on allocation of time between labour market and home production and to take into account lack or time of lone parents, we are interested on identifying the typical cases of one-earner couple, two-earner couple and single female earner. Besides, we want to compare similar types of one-earner couple and single earner but supported by earners of different gender. Finally, in developing countries we have to take into account the existence of extended households (households where there are members related by other links than children or partner such as grand-parents, brothers-in-law, nephews, non-relatives, etc.) whose gendered nature is difficult to be captured.</p>
<p>Thus, we made a classification of the population that takes into account the household structure and the employment status of household members. The classification appears in the first column of <xref ref-type="table" rid="table2">Table 2</xref>.</p>
<table-wrap id="table2" position="float">
<label>Table 2.</label>
<caption><title>Main characteristics of household categories</title></caption>
<table frame="hsides" rules="groups">
<thead>
<tr>
<th align="left">Household category</th>
<th align="left">Frequency (weighted cases) (%)</th>
<th align="left">Households with children (%)</th>
<th align="left">Number of members</th>
<th align="left">Number of earners</th>
<th align="left">Lack of contribution to social security (%)</th>
<th align="left">Age of the household head and spouse</th>
<th align="left">Number of cases in the sample</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">All</td>
<td align="left">100</td>
<td align="left">59.8</td>
<td align="left">3.7</td>
<td align="left">1.9</td>
<td align="left">22.5</td>
<td align="left">48.9</td>
<td align="left">124,987</td>
</tr>
<tr>
<td align="left">Couple, male breadwinner</td>
<td align="left">18.4</td>
<td align="left">72.4</td>
<td align="left">4.1</td>
<td align="left">1.4</td>
<td align="left">27.3</td>
<td align="left">42.5</td>
<td align="left">22,230</td>
</tr>
<tr>
<td align="left">Couple, dual earner</td>
<td align="left">30.7</td>
<td align="left">72.1</td>
<td align="left">3.8</td>
<td align="left">2.3</td>
<td align="left">19.9</td>
<td align="left">41.4</td>
<td align="left">37,082</td>
</tr>
<tr>
<td align="left">Couple, female breadwinner</td>
<td align="left">3.2</td>
<td align="left">42.1</td>
<td align="left">3.3</td>
<td align="left">1.9</td>
<td align="left">27.7</td>
<td align="left">52.4</td>
<td align="left">4,033</td>
</tr>
<tr>
<td align="left">Couple, non-employed</td>
<td align="left">7.0</td>
<td align="left">9.1</td>
<td align="left">2.6</td>
<td align="left">1.7</td>
<td align="left">4.5</td>
<td align="left">68.5</td>
<td align="left">9,008</td>
</tr>
<tr>
<td align="left">Single, male breadwinner</td>
<td align="left">3.2</td>
<td align="left">20.1</td>
<td align="left">1.7</td>
<td align="left">1.2</td>
<td align="left">31.6</td>
<td align="left">47.1</td>
<td align="left">4,125</td>
</tr>
<tr>
<td align="left">Single, female breadwinner</td>
<td align="left">7.8</td>
<td align="left">60.6</td>
<td align="left">2.9</td>
<td align="left">1.5</td>
<td align="left">30.4</td>
<td align="left">45.2</td>
<td align="left">11,225</td>
</tr>
<tr>
<td align="left">Single, non-employed male</td>
<td align="left">1.3</td>
<td align="left">3.6</td>
<td align="left">1.4</td>
<td align="left">1.1</td>
<td align="left">3.9</td>
<td align="left">70.2</td>
<td align="left">1,886</td>
</tr>
<tr>
<td align="left">Single, non-employed female</td>
<td align="left">6.1</td>
<td align="left">22.0</td>
<td align="left">2.2</td>
<td align="left">1.1</td>
<td align="left">9.4</td>
<td align="left">65.9</td>
<td align="left">8,670</td>
</tr>
<tr>
<td align="left">Couple, male breadwinner, extended</td>
<td align="left">4.0</td>
<td align="left">83.1</td>
<td align="left">5.8</td>
<td align="left">2.3</td>
<td align="left">34.2</td>
<td align="left">48.5</td>
<td align="left">4,721</td>
</tr>
<tr>
<td align="left">Couple, dual earner, extended</td>
<td align="left">4.5</td>
<td align="left">80.5</td>
<td align="left">5.4</td>
<td align="left">3.2</td>
<td align="left">28.1</td>
<td align="left">45.8</td>
<td align="left">5,268</td>
</tr>
<tr>
<td align="left">Couple, female breadwinner, extended</td>
<td align="left">0.8</td>
<td align="left">70.1</td>
<td align="left">5.2</td>
<td align="left">2.8</td>
<td align="left">31.2</td>
<td align="left">56.5</td>
<td align="left">943</td>
</tr>
<tr>
<td align="left">Couple, non-employed , extended</td>
<td align="left">2.2</td>
<td align="left">65.2</td>
<td align="left">5.0</td>
<td align="left">2.7</td>
<td align="left">14.1</td>
<td align="left">66.5</td>
<td align="left">2,615</td>
</tr>
<tr>
<td align="left">Single, male breadwinner, extended</td>
<td align="left">1.7</td>
<td align="left">37.7</td>
<td align="left">3.5</td>
<td align="left">2.2</td>
<td align="left">30.8</td>
<td align="left">44.4</td>
<td align="left">1,976</td>
</tr>
<tr>
<td align="left">Single, female breadwinner, extended</td>
<td align="left">4.1</td>
<td align="left">71.8</td>
<td align="left">4.4</td>
<td align="left">2.2</td>
<td align="left">33.7</td>
<td align="left">47.9</td>
<td align="left">5,113</td>
</tr>
<tr>
<td align="left">Single, non-employed male, extended</td>
<td align="left">0.8</td>
<td align="left">50.1</td>
<td align="left">3.9</td>
<td align="left">2.0</td>
<td align="left">19.2</td>
<td align="left">65.6</td>
<td align="left">974</td>
</tr>
<tr>
<td align="left">Single, non-employed female, extended</td>
<td align="left">4.2</td>
<td align="left">62.8</td>
<td align="left">4.3</td>
<td align="left">2.2</td>
<td align="left">20.1</td>
<td align="left">65.8</td>
<td align="left">5,118</td>
</tr>
</tbody>
</table>
<table-wrap-foot>
<fn><p><italic>Source</italic>: Authors&#x2019; calculations based on Encuesta Continua de Hogares 2013, Instituto Nacional de Estad&#x00ED;stica.</p></fn>
<fn><p><italic>Note</italic>: The lack of contribution to social security is calculated at household level as the ratio between non-contributors and workers; the ratio takes value 0 when no one in the household participates in the labour market.</p></fn>
</table-wrap-foot>
</table-wrap>
<p>We first distinguish extended from non-extended households (that are comprised of single individuals or couples, with or without children at any age). We distinguish eight household types within each group. In the rest of the paper we focus on the eight types of non-extended households.</p>
<p>Three categories represent the typical cases that are of interest from the gender perspective of tax studies. The &#x201C;couple, male breadwinner&#x201D; category includes non-extended households formed by a couple (with or without children) in which only the male participates in the labour market. Around 19 per cent of individuals live in this type of household. The &#x201C;single, female breadwinner&#x201D; category consists of a non-extended household headed by a single worker woman, and accounts for 7.8 per cent of population. The &#x201C;couple, dual earner&#x201D; category corresponds to non-extended households formed by a couple in which both the male and female work in the labour market. This category is the most frequent, accounting for 30.7 per cent of individuals.</p>
<p>As reported in <xref ref-type="table" rid="table2">Table 2</xref>, most of the households in these three categories have children and the average age of the adults is fairly similar. In turn, as shown in <xref ref-type="fig" rid="fig3">Figure 3</xref>, the &#x201C;couple, dual earner&#x201D; category has the highest per capita income of the three types. Labour income is the most important source in all three categories and public transfers are more important for the &#x201C;single, female breadwinner&#x201D; type than for the others.</p>
<fig id="fig3" position="float" fig-type="figure">
<label>Figure 3.</label>
<caption><title>Per capita income of households by source.</title>
<p><italic>Source</italic>: Authors&#x2019; calculations based on <italic>Encuesta Continua de Hogares</italic> 2013, <italic>Instituto Nacional de Estad&#x00ED;stica</italic>.</p></caption>
<graphic xlink:href="ijm-00202-fig003.tif"/>
</fig>
</sec>
<sec id="s3-3">
<title>3.3. Empirical strategy</title>
<p>We aim to identify gender differences in the PIT burden and also to examine the role of some specific household characteristics in the explanation of those differences. A particular issue in our study is that the main variable of interest, the PIT-to-income ratio, includes many observations of 0 and no 1 seconds (no household is taxed at 100%). These zeros can provide important information for the study of the lowest levels of taxation and they are included for theoretical and empirical reasons. Hence, we conduct the empirical analysis considering a dependent variable that assumes values in the interval [0, 1) and contains excess of zeros.</p>
<p>In a case like this, the dependent variable is not symmetrically distributed, so the predicted values of the linear regression model may lie outside the unit interval. As an alternative, <xref ref-type="bibr" rid="bib12">Cook et al. (2008)</xref> proposed the zero-one inflated beta model (ZOIB) which properly addresses the issue related to the inflation process in the data.</p>
<p>Several authors (<xref ref-type="bibr" rid="bib26">Paolino, 2001</xref>; <xref ref-type="bibr" rid="bib22">Kieschnick and McCullough, 2003</xref>; <xref ref-type="bibr" rid="bib29">Smithson and Verkuilen, 2006</xref>) argue that the beta regression model is the most suitable for distributional asymmetries and can be adjusted for data in the interval (0, 1) since the density function takes different shapes depending on the function parameters. <xref ref-type="bibr" rid="bib16">Ferrari and Cribari-Neto (2004)</xref> proposed the following parameterization for the density function of the response variable <italic>y</italic> when it adopts a beta distribution <italic>&#x0392;(&#x03BC;, &#x03D5;</italic>):</p>
<p>where <italic>&#x00B5;</italic> is the mean (0 &#x003C; <italic>&#x00B5;</italic>&#x003C;1), <italic>&#x03D5;</italic> a precision parameter (<italic>&#x03D5;</italic>&#x003E;0) and <italic>&#x0393;</italic>(.) is the gamma function.</p>
<p>In practice, the beta distribution is not suitable for modelling data that contains zeros or ones. But we want to consider observations where the dependent variable is zero. Therefore, we apply a combination of two distributions: a beta distribution when the variable is bounded by 0 and 1, and another distribution function that is in effect when the variable takes the value 0. For a detailed description of this methodology see <xref ref-type="bibr" rid="bib24">Ospina and Ferrari (2010)</xref>, <xref ref-type="bibr" rid="bib25">Ospina and Ferrari, 2012</xref>). The density is called a zero-inflated beta distribution and the probability function generated by the combination is:</p>
<p>In this paper, we carry out all the estimations using the Stata module <italic>zoib</italic> developed by <xref ref-type="bibr" rid="bib10">Buis (2012)</xref>.<sup>[<xref ref-type="fn" rid="fn3">3</xref>]</sup> The <italic>zoib</italic> command consists of a maximum likelihood estimation of the combined model: a logistic regression of whether or not the income share paid to taxes equals zero and a beta regression for the proportions in the interval (0, 1). We perform all the estimations using robust standard errors.</p>
<p>Our explanatory variable of interest is a vector of dummy variables that captures household type, which provides the gendered classification of the population. We also use several variables that reflect household characteristics: the household per capita income, a dummy variable that takes a value equal to one when there is at least one member younger than 18 in the household, the household size, the number of earners per household and the lack of contribution to social security measured as the ratio of the number of workers that are not contributors and the number of workers in the household (the ratio takes value 0 when there are no workers in the household). Additionally, we break down the household income by source in order to separately capture the incidence of all sources: capital income, labour income, pensions, other income (public and private transfers plus self-consumption) and rental value. The choice of these variables responds to the fact that they may explain differences in the PIT burden due to the characteristics of the tax detailed in Section 2.2. In particular, we aim to capture progressivity, the treatment to the different sources of income and the design of credits and deductions.</p>
<p>We compute and report the marginal effects of the dependent variables on the PIT-to-income ratio. In the case of the household type vector, the effect is the discrete effect of moving from &#x201C;couple, dual earner&#x201D; to each respective other household type. For the other variables, the effect is measured for the &#x201C;couple, dual earner&#x201D; household, valuing the rest of the variables at their mean.</p>
</sec>
</sec>
<sec id="s4">
<title>4. Results</title>
<sec id="s4-1">
<title>4.1. Tax incidence analysis</title>
<p>The PIT is a progressive tax. Its Kakwani index is positive (0.360) and the Gini index declines from 0.426 pre-tax to 0.413 post-tax, reflecting the PIT&#x2019;s equalizing effect. However, the distributive effect is limited because of the tax size and exemptions. Around 54% of the population lives in households that do not pay the tax, and the average PIT burden is 1.8% population wide and 3.9% among the population of households who face this tax.</p>
<p>In <xref ref-type="fig" rid="fig4">Figure 4</xref> we present the PIT incidence by household type. The dark bar shows the average burden and the pale bar shows the proportion of non-taxpayers; for both variables, a straight line indicates the 95% confidence interval of the estimation.</p>
<fig id="fig4" position="float" fig-type="figure">
<label>Figure 4.</label>
<caption><title>Average PIT burden and proportion of non-taxpayers by household type</title>
<p><italic>Source</italic>: Authors&#x2019; calculations based on Encuesta Continua de Hogares 2013, Instituto Nacional de Estad&#x00ED;stica.</p>
<p><italic>Note</italic>: in each bar, the straight line indicates the 95% confidence interval of the estimation.</p></caption>
<graphic xlink:href="ijm-00202-fig004.tif"/>
</fig>
<p>At the top we show the five types of non-extended working households. The &#x201C;couple, dual earner&#x201D; category bears the largest PIT burden (2.4%) and has the highest proportion of taxpayers (61%). The &#x201C;couple, dual earner&#x201D; category is followed by male breadwinner households which have an average burden of 2% when living with no partner and 1.8% when living with a partner. Finally, the lowest burden corresponds to female breadwinner types: 1.5% when in union or married and 1.2% when single.</p>
<p>The PIT burden is lower for non-employed households than households of workers. Among the latter ones, the highest tax incidence corresponds to the &#x201C;couple, non-employed&#x201D; type with an average burden of 1.5% whereas the single types pay an average of 1% of income in the form of the PIT. There are no significant gender differences between single types.</p>
<p>We report the PIT incidence for extended households following the same order as for non-extended households. The tax burden is lower among extended households. The gender differences within extended households are similar to those already depicted.</p>
</sec>
<sec id="s4-2">
<title>4.2. Exploring differences among non-extended workers&#x2019; households</title>
<p>We analyse the tax burden differences between household types through the estimation of a ZOIB model. We include sixteen dummy variables that distinguish household types, but in this section we only show the results for the household types of interest.</p>
<p>In <xref ref-type="table" rid="table3">Table 3</xref> we report the discrete effect of the household type relative to the &#x201C;couple, dual earner&#x201D; type. In column Model one we show the results of an estimation in which we do not include any control. Thus, these estimated effects replicate the patterns of the raw PIT burden differences already shown: all effects are negative, indicating that the dual earner type has a higher PIT-to-income ratio, and that male types have a higher ratio than female types regardless of whether comparing singles or couples.</p>
<table-wrap id="table3" position="float">
<label>Table 3.</label>
<caption><title>Marginal effects estimated by a zero-inflated beta regression</title></caption>
<table frame="hsides" rules="groups">
<thead>
<tr>
<th align="left">Variables</th>
<th align="left">Model 1</th>
<th align="left">Model 2</th>
<th align="left">Model 3</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Couple, male breadwinner</td>
<td align="left">&#x2212;0.0067<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00005)</td>
<td align="left">0.0048<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00007)</td>
<td align="left">0.0046<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00007)</td>
</tr>
<tr>
<td align="left">Single, female breadwinner</td>
<td align="left">&#x2212;0.0116<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">&#x2212;0.0141<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">&#x2212;0.0056<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00007)</td>
</tr>
<tr>
<td align="left">Couple, female breadwinner</td>
<td align="left">&#x2212;0.0084<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00008)</td>
<td align="left">&#x2212;0.0071<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00008)</td>
<td align="left">0.0035<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00009)</td>
</tr>
<tr>
<td align="left">Single, male breadwinner</td>
<td align="left">&#x2212;0.0045<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00010)</td>
<td align="left">&#x2212;0.0184<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">&#x2212;0.0150<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00010)</td>
</tr>
<tr>
<td align="left">Per capita income</td>
<td align="left"></td>
<td align="left">0.0205<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00004)</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Presence of children (yes =1)</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0082<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00004)</td>
</tr>
<tr>
<td align="left">Household size</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0041<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00002)</td>
</tr>
<tr>
<td align="left">Number of earners (labour, capital earnings or pensions)</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">&#x2212;0.0044<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00003)</td>
</tr>
<tr>
<td align="left">Lack of contribution to social security</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">&#x2212;0.0001<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00000)</td>
</tr>
<tr>
<td align="left">Per capita capital income</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0574<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00075)</td>
</tr>
<tr>
<td align="left">Per capita labour income</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0286<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00008)</td>
</tr>
<tr>
<td align="left">Per capita pension</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0278<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00009)</td>
</tr>
<tr>
<td align="left">Per capita public transfer</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">&#x2212;0.0036<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00012)</td>
</tr>
<tr>
<td align="left">Per capita imputed rent of owner-occupied house</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">&#x2212;0.0051<sup><xref ref-type="table-fn" rid="T3_FN1">***</xref></sup><break/>(0.00011)</td>
</tr>
<tr>
<td align="left">Observations</td>
<td align="left">124,987</td>
<td align="left">124,987</td>
<td align="left">124,987</td>
</tr>
</tbody>
</table>
<table-wrap-foot>
<fn><p><italic>Source</italic>: Authors&#x2019; estimations based on Encuesta Continua de Hogares 2013, Instituto Nacional de Estad&#x00ED;stica.</p></fn>
<fn><p><italic>Note</italic>: For household types, we report the discrete effect related to the &#x201C;couple, dual earner&#x201D; type, valuing the rest of the variables at their means. For the rest of the dependent variables, we report the &#x2018;marginal effect&#x2019; by household type compared to the &#x201C;couple, dual earner&#x201D; type.</p></fn>
<fn id="T3_FN1" fn-type="general"><p>***p&#x003C;0.01, **p&#x003C;0.05, *p&#x003C;0.1</p></fn>
</table-wrap-foot>
</table-wrap>
<p>The purpose of the PIT is progressivity, so a proper analysis needs to control the results by income. Thus, we estimate Model two in which we add per capita gross income as a control. As expected, the PIT burden increases with income. The difference in income levels by household type affects the order of the three typical cases: now, the &#x201C;couple, male breadwinner&#x201D; type has the highest PIT-to-income ratio, followed by &#x201C;couple, dual earner&#x201D; and &#x201C;single, female breadwinner&#x201D;.</p>
<p>These results are consistent with gender equality although we do not know (and we do not address the study of) the optimal magnitude of the gaps. The lower tax burden among dual earner than among male breadwinner households does not discourage female labour market participation. Also, there would be a fairness concern if the one earner household receives a better treatment than a female without a spouse. Nelson&#x2019;s argument is behind this gender equity concept: given income, welfare depends on the capacity of household&#x2019;s production which is not taxed.</p>
<p>Besides the three typical types, there are two other comparisons that may help to understand gender differences: &#x201C;couple, male breadwinner&#x201D; vs &#x201C;couple, female breadwinner&#x201D; and &#x201C;single, female breadwinner&#x201D; vs &#x201C;single, male breadwinner&#x201D;. Both female types bear a lower tax burden than male types.</p>
<p>To analyse the PIT ratio differences between household types, we estimate Model three in which we include possible sources of those differences: presence of children, household size, number of earners and the lack of contribution to social security (a proxy of the percentage of worker tax evaders in the household). Also, the explanatory variable of income is split into several sources. As shown in <xref ref-type="table" rid="table3">Table 3</xref>, even after including all the variables that may explain the differences, the gaps decline although they do not vanish. .</p>
<p>Let&#x2019;s analyse the demographic controls. The tax burden is higher when there are children in the household and increases with household size. This result is not surprising: on the one hand, the tax burden is likely to increase with total household income because of the progressivity of marginal tax rates on pensions and labour earnings; on the other hand, in each level of per capita household income, total income of the household increases with its size. As the average values of household size and presence of children are higher for &#x201C;couple, male breadwinner&#x201D; than &#x201C;couple, dual earner&#x201D;, the PIT burden tends to be higher for the former</p>
<p>We interpret that the presence of children and the household size are demographic characteristics mainly related to life-cycle stage. But tax evasion and the income sources are at least partially influenced by culture and socioeconomic arrangements, so the interpretation of the PIT ratio differences should be interpreted cautiously from a gender perspective.</p>
<p>The effect of the number of earners is negative because of the progressivity of marginal taxes. I.e., at a given level of income, the PIT-to-income ratio is lower when the number of members receiving income is higher. As the number of earners is lower in the &#x201C;couple, male breadwinner&#x201D; category than the &#x201C;couple, dual earner&#x201D; category, the variable contributes to a higher gap between these types.</p>
<p>Unsurprisingly, the lack of contribution (tax evasion) has a negative effect. As it is higher in &#x201C;couple, male breadwinner&#x201D; than in &#x201C;couple, dual earner&#x201D; households, different behaviour patterns in tax evasion do not contribute to explain the tax burden gap.</p>
<p>Finally, the marginal effects by income source indicate that the tax burden decreases when households are supported by non-taxable income (transfers and rental value). These sources are very important within the female type households so they contribute to explain their lower PIT burden. Public transfers are an important part of the non-taxable income. In Uruguay, most of the public programs of monetary transfers are directed to low-resources families. So, our findings suggest that the incidence of low income households is higher among female than male types. The share of non-taxable income is 13% among &#x201C;couple, dual earner&#x201D; but 25% for &#x201C;single, female breadwinner&#x201D;. In turn, for the &#x201C;single, male breadwinner&#x201D;, which tax burden is higher than its female counterpart, the non-taxable income accounts for 16% of their income. Finally, the incidence of non-taxed income for &#x201C;couple, female breadwinner&#x201D; (22%) is higher than for &#x201C;couple, male breadwinner&#x201D; (18%).</p>
<p>These results reflect the average situation. We also did an estimation based on Model three in which the household type is interacted with all the income sources. In <xref ref-type="fig" rid="fig5">Figure 5</xref> we report the predicted PIT burden across the per capita income distribution for &#x201C;couple, dual earner&#x201D;, &#x201C;couple, male breadwinner&#x201D; and &#x201C;single, female breadwinner&#x201D;. The average depicted pattern is clearly identified in the central range of the income distribution: between the 25th and 75th percentile, the &#x201C;couple, male breadwinner&#x201D; type bears the highest burden whereas the &#x201C;single, female breadwinner&#x201D; exhibits the lowest one. But over the 75th percentile, the difference between the curves for the &#x201C;couple, dual earner&#x201D; and the &#x201C;couple, male breadwinner&#x201D; categories are not statistically significant at conventional levels. Meanwhile, &#x201C;single, female breadwinner&#x201D; has the lowest burden level across the entire distribution, although the magnitude of the gap is lower at the tails.</p>
<fig id="fig5" position="float" fig-type="figure">
<label>Figure 5.</label>
<caption><title>Predicted PIT across percentiles of per capita income distribution for three selected household types.</title>
<p><italic>Source</italic>: Authors&#x2019; estimations based on Encuesta Continua de Hogares 2013, Instituto Nacional de Estad&#x00ED;stica.</p></caption>
<graphic xlink:href="ijm-00202-fig005.tif"/>
</fig>
</sec>
<sec id="s4-3">
<title>4.3. Introducing joint taxation</title>
<p>Up to now we assumed that all individuals opt for individual filing. In this section we estimate the PIT amounts that would be paid under joint filing if we assume that couples choose the lowest burden option. Remind that we estimated that 5.4% of couples in the Tax Office records chose joint filing in 2013. In our simulation we find that 17% of the households with a labour income source (12% of total households) would benefit by choosing joint instead of individual filing. Thus, this estimation is much higher than the one based on tax records.</p>
<p>According to our simulation, joint filing is not only the best choice for the &#x201C;couple, male breadwinner&#x201D; type but also for one quarter of the &#x201C;couple, dual earner&#x201D; households in the database that pay PIT.</p>
<p>To analyse the potential effect of the joint filing option we estimate each model assuming that couples choose their best option. The results are reported in <xref ref-type="table" rid="table4">Table 4</xref>.</p>
<table-wrap id="table4" position="float">
<label>Table 4.</label>
<caption><title>Marginal effects estimated by a zero-inflated beta regression</title></caption>
<table frame="hsides" rules="groups">
<thead>
<tr>
<th align="left">Variables</th>
<th align="left">Model 1</th>
<th align="left">Model 2</th>
<th align="left">Model 3</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Couple, male breadwinner</td>
<td align="left">&#x2212;0.0086<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00004)</td>
<td align="left">0.0022<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">0.0025<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00007)</td>
</tr>
<tr>
<td align="left">Single, female breadwinner</td>
<td align="left">&#x2212;0.0107<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">&#x2212;0.0123<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">&#x2212;0.0031<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00007)</td>
</tr>
<tr>
<td align="left">Couple, female breadwinner</td>
<td align="left">&#x2212;0.0095<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00008)</td>
<td align="left">&#x2212;0.0081<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00007)</td>
<td align="left">0.0016<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00010)</td>
</tr>
<tr>
<td align="left">Single, male breadwinner</td>
<td align="left">&#x2212;0.0036<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00010)</td>
<td align="left">&#x2212;0.0164<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">&#x2212;0.0122<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00010)</td>
</tr>
<tr>
<td align="left">Per capita income</td>
<td align="left"></td>
<td align="left">0.0201<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00004)</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Presence of children (yes =1)</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0084<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00004)</td>
</tr>
<tr>
<td align="left">Household size</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0045<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00002)</td>
</tr>
<tr>
<td align="left">Number of earners (labour, capital earnings or pensions)</td>
<td align="left">&#x2003;</td>
<td align="left">&#x2003;</td>
<td align="left">&#x2212;0.0044<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00003)</td>
</tr>
<tr>
<td align="left">&#x2003;Lack of contribution to social security</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">&#x2212;0.0001<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00000)</td>
</tr>
<tr>
<td align="left">Per capita capital income</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0665<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00089)</td>
</tr>
<tr>
<td align="left">Per capita labour income</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0299<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00007)</td>
</tr>
<tr>
<td align="left">Per capita pension</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">0.0302<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00009)</td>
</tr>
<tr>
<td align="left">Per capita public transfer</td>
<td align="left"></td>
<td align="left"></td>
<td align="left">&#x2212;0.0032<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00013)</td>
</tr>
<tr>
<td align="left">Per capita imputed rent of owner-occupied house</td>
<td align="left">&#x2003;</td>
<td align="left"></td>
<td align="left">&#x2212;0.0054<sup><xref ref-type="table-fn" rid="T4_FN1">***</xref></sup><break/>(0.00011)</td>
</tr>
<tr>
<td align="left">Observations</td>
<td align="left">124,987</td>
<td align="left">124,987</td>
<td align="left">124,987</td>
</tr>
</tbody>
</table>
<table-wrap-foot>
<fn><p><italic>Source</italic>: Authors&#x2019; estimations based on Encuesta Continua de Hogares 2013, Instituto Nacional de Estad&#x00ED;stica.</p></fn>
<fn><p><italic>Note</italic>: For household types, we report the discrete effect related to the &#x201C;couple, dual earner&#x201D; type, valuing the rest of the variables at their means. For the rest of the dependent variables, we report the &#x2018;marginal effect&#x2019; by household type compared to the &#x201C;couple, dual earner&#x201D; type.</p></fn>
<fn id="T4_FN1" fn-type="general"><p>***p&#x003C;0.01, **p&#x003C;0.05, *p&#x003C;0.1</p></fn>
</table-wrap-foot>
</table-wrap>
<p>The patterns between models are similar to those obtained under the assumption of individual filing. Model two indicates that the &#x201C;couple, male breadwinner&#x201D; type bears the highest burden, followed by &#x201C;couple, dual earner&#x201D; and &#x201C;single, female breadwinner&#x201D;. But the gap between &#x201C;couple, male breadwinner&#x201D; and &#x201C;couple, dual earner&#x201D; is smaller than under individual filing. This suggests that joint filing helps to offset the incentives of sharing labour market work between spouses implicit in individual filing. Also the difference between &#x201C;single, female breadwinner&#x201D; and &#x201C;couple, dual earner&#x201D; becomes smaller. This is due to the gains for some &#x201C;couple, dual earner&#x201D; households opting for joint filing.</p>
</sec>
<sec id="s4-4">
<title>4.4. The tax burden of non-employed</title>
<p>The estimation of Model two indicates that the &#x201C;couple, non-employed&#x201D; type bears a lower burden than the &#x201C;couple, dual earner&#x201D; type (a significant marginal effect of &#x2013;0.0087). This difference between types responds mainly to the fact that households of non-employed are formed by small households of elders. Thus, a similar per capita income means a higher total income for the &#x201C;couple, dual earner&#x201D; type. Once we control by the demographic variables, the marginal effect of &#x201C;couple, non-employed&#x201D; is positive. Indeed, the elders tend to face a higher PIT burden because they are more likely supported by pensions and capital income than labour income.</p>
<p>In <xref ref-type="table" rid="table5">Table 5</xref> we present the estimated effect of the &#x201C;single, non-employed&#x201D; types relative to the &#x201C;couple, non-employed&#x201D; type. The negative effects indicate that among non-employed households, the couple type has the highest burden. The interest for our purpose is that the difference between the female and male types is small in all models &#x2013; ie, the PIT seems to not have different gendered treatment among the non-employed.</p>
<table-wrap id="table5" position="float">
<label>Table 5.</label>
<caption><title>Marginal effects estimated by a zero-inflated beta regression</title></caption>
<table frame="hsides" rules="groups">
<thead>
<tr>
<th align="left">Variables</th>
<th align="left">Model 1</th>
<th align="left">Model 2</th>
<th align="left">Model 3</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Single, non-employed female</td>
<td align="left">&#x2212;0.0045<sup><xref ref-type="table-fn" rid="T5_FN1">***</xref></sup><break/>(0.00013)</td>
<td align="left">&#x2212;0.0103<sup><xref ref-type="table-fn" rid="T5_FN1">***</xref></sup><break/>(0.00007)</td>
<td align="left">&#x2212;0.0128<sup><xref ref-type="table-fn" rid="T5_FN1">***</xref></sup><break/>(0.00016)</td>
</tr>
<tr>
<td align="left">Single, non-employed male</td>
<td align="left">&#x2212;0.0049<sup><xref ref-type="table-fn" rid="T5_FN1">***</xref></sup><break/>(0.00007)</td>
<td align="left">&#x2212;0.0105<sup><xref ref-type="table-fn" rid="T5_FN1">***</xref></sup><break/>(0.00006)</td>
<td align="left">&#x2212;0.0122<sup><xref ref-type="table-fn" rid="T5_FN1">***</xref></sup><break/>(0.00011)</td>
</tr>
<tr>
<td align="left">Controls</td>
<td align="left">No</td>
<td align="left">Yes</td>
<td align="left">Yes</td>
</tr>
<tr>
<td align="left">Observations</td>
<td align="left">124,987</td>
<td align="left">124,987</td>
<td align="left">124,987</td>
</tr>
</tbody>
</table>
<table-wrap-foot>
<fn><p><italic>Source</italic>: Authors&#x2019; estimations based on Encuesta Continua de Hogares 2013, Instituto Nacional de Estad&#x00ED;stica.</p></fn>
<fn><p><italic>Note</italic>: The vector of household types includes 16 categories (presented in Table 2); for the estimation we omitted &#x201C;couple, non-employed&#x201D;. The rest of the variables are valued at mean. Models 2 and 3 include the control variables shown in tables 3 and 4.</p></fn>
<fn id="T5_FN1" fn-type="general"><p>***p&#x003C;0.01, **p&#x003C;0.05, *p&#x003C;0.1</p></fn>
</table-wrap-foot>
</table-wrap>
<p>In <xref ref-type="fig" rid="fig6">Figure 6</xref> we present the predicted PIT burden across the per capita income distribution, calculated based on Model 3. The average pattern holds for all ranges of the per capita income distribution: we do not find gender differences.</p>
<fig id="fig6" position="float" fig-type="figure">
<label>Figure 6.</label>
<caption><title>Predicted PIT across percentiles of per capita income distribution for three selected household types</title>
<p>Source: Authors&#x2019; estimations based on Encuesta Continua de Hogares 2013, Instituto Nacional de Estad&#x00ED;stica.</p></caption>
<graphic xlink:href="ijm-00202-fig006.tif"/>
</fig>
</sec>
</sec>
<sec id="s5">
<title>5. Conclusions</title>
<p>Gender issues have been debated in the policy agenda of social security system and led to some modifications such as the use of similar mortality rates for women and men to calculate the retirement pension, and the computation for women of one year per child in the calculus of the number of years of contribution required to retire. Feminist movements also claim the reduction of indirect taxes is some female goods, especially the ones linked to reproductive health.</p>
<p>In this study, we analyse the gendered effects of the PIT in Uruguay. The PIT was introduced ten years ago by a left government and the discussions about it (before and after its creation) are centred on its distributive effect. However, gender equity has not been raised in this debate.</p>
<p>The analysis of the legislation indicates that there are no explicit gender differences in the code, which means that the PIT treats women and men on an equal basis regarding rates, credits and deductions. There is a flat tax rate for capital income and two different progressive schedules for pensions and labour income. It is a joint filing system though joint system is allowed for couple income. On the base of Tax records we estimate that only 5.4% of couples (with at least one labour income earner) used the joint filing option in 2013. This low incidence may be explained by the lack of incentives to opt for joint filing. However, on the base of survey data, we estimate that 17% of couples (with at least one labour income earner) would benefit for joint filing. We cannot assess the difference between these two estimations. Note that there are not simple rules (such ranges of income level or ranges of participation of one spouse in the couple&#x2019;s labour income), except the case of one earner couples, to inform the population who benefit or not of joint filing. Thus, a possible explanation of the discrepancy is lack of information. Indeed, every year couples have to calculate their PIT payments under individual and joint filing to opt for the least costly. But there are probably other explanations that could be the scope of future research.</p>
<p>We conduct the analysis using microdata provided by the 2013 Household Survey. We estimated taxes and contributions using the statutory rates in force in 2013. There is an important limitation of the survey because of the underreporting of capital income ( <xref ref-type="bibr" rid="bib35">Burdin et al., 2014</xref>) whereas there are no assessments about the accuracy of the labour income reports of evader workers. Besides, as it informs income after taxes, we made several assumptions to estimate gross income. The most important are the ones related to evasion: we assume no evasion of income capital and full evasion of labour income when there is not contribution to the social security system. The evasion assumption related to labour income seems no to be too unrealistic: <xref ref-type="bibr" rid="bib35">Burdin et al., 2014</xref> find that the aggregated labour income obtained under this assumption is similar to the total labour income informed by Tax Office records. However, the assumption of no evasion of income capital may be extreme and could bias the results: the highest share of income capital is observed for non-employed households (both single male and female) and one earner households (male and female breadwinner types). Future analysis should work on the underreporting and evasion of capital income and assess the sensitivity of the results to these issues.</p>
<p>The raw data indicate that households in which both spouses participate in the labour market bear the highest PIT burden followed by the typical patriarchal household in which the husband works in the labour market but not the wife. But his order changes when we control by household per capita income. Households supported by a working man who lives with a dependent housewife face the highest tax burden, followed by the dual-earner type. This finding is similar to the obtained for Argentina ( <xref ref-type="bibr" rid="bib36">, 2018</xref>) and eight countries (Argentina, United Kingdom, Ghana, Uganda, Morocco, South Africa, Mexico and India) (<xref ref-type="bibr" rid="bib19">Grown and Valodia, 2010</xref>). When we control by different potential explanatory factors, a gap remains. One of the factors that explain the gap is the lower number of earners of male breadwinner households which is consequence of the individual filing design. But even in the analysis of the joint filing design, the PIT burden is higher for male breadwinner than dual earner households.</p>
<p>These findings indicate that there is an incentive towards equal gender time allocation within the family, which is consistent with gender equity. On one hand, PIT does not discourage labour market participation of a second earner due that it is not taxed at higher rates. On the other hand, given that male breadwinner households may reach higher levels of welfare from non-taxed home production, the result is potentially not inconsistent with neutrality in terms of allocation between household and market time. However we cannot assess the magnitudes of the estimated PIT burden gaps. We made an exercise in which we compare the tax burden of a one earner couple under joint taxation and a two-earner couple under individual couple. We assumed that the three earners of the example generated the same level of labour income and the fourth individual, a similar value of home production. For different income level, we obtained that the one earner couple has a lower PIT burden than the two earner couple. Thus, the assessment of gap magnitudes appears to be a relevant topic for further research.</p>
<p>Single mother households bear a lower burden than dual earner households when considering both raw data and income controlled gaps. Once again, this pattern is consistent with gender equity.</p>
<p>However, this pattern is partly explained by non-desirable aspects: the higher levels of informality and participation of non-taxable sources of income among single female households than dual earner households.</p>
<p>We also compare male and female breadwinner households, and single female and male households. In both comparisons we find that the male types bear a higher PIT burden than the female types, which is partly explained by the higher share of non-taxable income among female types. We also study three typical types of non-employed households and we do not find differences between female and male categories.</p>
<p>Our findings may contribute to the debate of future reforms of the PIT. In fact, once in a while there are social pressures to reduce taxes to alleviate the burden on families. The question is if a new design could worsen horizontal equality from a gender perspective. For example, it is not advisable to allow exemptions for dependant spouses but it would be helpful to take into account persons unable to support themselves. Also to eliminate the option for actual joint filing would improve equality and, on the other sides, changes in the schedule rate of the actual joint filing should be carefully assessed.</p>
</sec>
</body>
<back>
<sec sec-type="supplementary-material" id="s6">
<title>Supplementary material</title>
<p>Supplementary material &#x2014; source files, data files, codes and executables&#x2014; are available online at the IJM website.</p>
</sec>
<sec sec-type="data-availability" id="s7">
<title>Data availability</title>
<p>The data we have used is publicly available on the National Statistical Office website (<ext-link ext-link-type="uri" xlink:href="http://www.ine.gub.uy">www.ine.gub.uy</ext-link>).</p>
</sec>
<sec sec-type="code-availability" id="s8">
<title>Code availability</title>
<p>The code is open source and available from the journal upon request.</p>
</sec>
<sec>
<title>Competing interests</title>
<p>The authors whose names are listed immediately below certify that they have NO affiliations with or involvement in any organization or entity with any financial interest (such as honoraria; educational grants; participation in speakers&#x2019; bureaus; membership, employment, consultancies, stock ownership, or other equity interest; and expert testimony or patent-licensing arrangements), or non-financial interest (such as personal or professional relationships, affiliations, knowledge or beliefs) in the subject matter or materials discussed in this manuscript: Marisa Bucheli, Cecilia Olivieri. The authors whose names are listed immediately below report the following details of affiliation or involvement in an organization or entity with a financial or non-financial interest in the subject matter or materials discussed in this manuscript: Marisa Bucheli, Cecilia Olivieri.</p>
</sec>
<ref-list>
<title>References</title>
<ref id="bib1">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Alesina</surname>
<given-names>A</given-names>
</name>
<name>
<surname>Ichino</surname>
<given-names>A</given-names>
</name>
<name>
<surname>Karabarbounis</surname>
<given-names>L</given-names>
</name>
</person-group>
<year>2011</year>
<article-title>Gender-Based taxation and the division of family chores</article-title>
<source>American Economic Journal: Economic Policy</source>
<volume>3</volume>
<fpage>1</fpage>
<lpage>40</lpage>
<pub-id pub-id-type="doi">10.1257/pol.3.2.1</pub-id>
</element-citation>
</ref>
<ref id="bib3">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Amarante</surname>
<given-names>V</given-names>
</name>
<name>
<surname>Espino</surname>
<given-names>A</given-names>
</name>
<name>
<surname>Amarante</surname>
<given-names>V</given-names>
</name>
</person-group>
<year>2004</year>
<article-title>La segregaci&#x00F3;n ocupacional de g&#x00E9;nero y las diferencias en las remuneraciones de los asalariados privados. Uruguay, 1990-2000</article-title>
<source>Desarrollo Econ&#x00F3;mico</source>
<volume>44</volume>
<fpage>109</fpage>
<lpage>129</lpage>
<pub-id pub-id-type="doi">10.2307/3455869</pub-id>
</element-citation>
</ref>
<ref id="bib34">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Andrienko</surname>
<given-names>Y</given-names>
</name>
<name>
<surname>Apps</surname>
<given-names>P</given-names>
</name>
<name>
<surname>Rees</surname>
<given-names>R</given-names>
</name>
</person-group>
<year>2015</year>
<article-title>Gender bias in Tax systems based on household income</article-title>
<source>Annals of economics and statistics</source>
<volume>117/118</volume>
<fpage>141</fpage>
<lpage>155</lpage>
<pub-id pub-id-type="doi">10.15609/annaeconstat2009.117-118.141</pub-id>
</element-citation>
</ref>
<ref id="bib4">
<element-citation publication-type="book">
<person-group person-group-type="author">
<name>
<surname>Apps</surname>
<given-names>P</given-names>
</name>
<name>
<surname>Rees</surname>
<given-names>R</given-names>
</name>
</person-group>
<year>2009</year>
<source>Public economics and the household</source>
<publisher-name>Cambridge University Press</publisher-name>
</element-citation>
</ref>
<ref id="bib5">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Apps</surname>
<given-names>P</given-names>
</name>
<name>
<surname>Rees</surname>
<given-names>R</given-names>
</name>
</person-group>
<year>2010</year>
<article-title>Family labor supply, taxation and saving in an imperfect capital market</article-title>
<source>Review of Economics of the Household</source>
<volume>8</volume>
<fpage>297</fpage>
<lpage>323</lpage>
<pub-id pub-id-type="doi">10.1007/s11150-010-9094-1</pub-id>
</element-citation>
</ref>
<ref id="bib6">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Bach</surname>
<given-names>S</given-names>
</name>
<name>
<surname>Haan</surname>
<given-names>P</given-names>
</name>
<name>
<surname>Ochmann</surname>
<given-names>R</given-names>
</name>
</person-group>
<year>2013</year>
<article-title>Taxation of married couples in Germany and the UK: One-earner couples make the difference</article-title>
<source>International Journal of Microsimulation</source>
<volume>6</volume>
<fpage>3</fpage>
<lpage>24</lpage>
</element-citation>
</ref>
<ref id="bib7">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Barreix</surname>
<given-names>A</given-names>
</name>
<name>
<surname>Roca</surname>
<given-names>J</given-names>
</name>
</person-group>
<year>2007</year>
<article-title>Strengthening a fiscal Pillar: the Uruguayan dual income tax</article-title>
<source>CEPAL Review</source>
<volume>2007</volume>
<fpage>121</fpage>
<lpage>140</lpage>
<pub-id pub-id-type="doi">10.18356/126c5701-en</pub-id>
</element-citation>
</ref>
<ref id="bib8">
<element-citation publication-type="report">
<person-group person-group-type="author">
<name>
<surname>Bucheli</surname>
<given-names>M</given-names>
</name>
<name>
<surname>Lara</surname>
<given-names>C</given-names>
</name>
</person-group>
<year>2018</year>
<source>Revealing Gender Gap Changes in Home Production and Labor Income in Uruguay WP 5/18</source>
<publisher-name>Departamento de Econom&#x00ED;a, Facultad de Ciencias Sociales, UDELAR</publisher-name>
</element-citation>
</ref>
<ref id="bib9">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Bucheli</surname>
<given-names>M</given-names>
</name>
<name>
<surname>Sanrom&#x00E1;n</surname>
<given-names>G</given-names>
</name>
</person-group>
<year>2005</year>
<article-title>Salarios femeninos en Uruguay: &#x00BF;existe un techo de cristal?</article-title>
<source>Revista de Econom&#x00ED;a</source>
<volume>12</volume>
<fpage>63</fpage>
<lpage>88</lpage>
</element-citation>
</ref>
<ref id="bib10">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Buis</surname>
<given-names>M</given-names>
</name>
</person-group>
<year>2012</year>
<article-title>ZOIB: Stata module to fit a zero-one inflated beta distribution by maximum likelihood</article-title>
<source>Statistical Software Components</source>
</element-citation>
</ref>
<ref id="bib35">
<element-citation publication-type="book">
<person-group person-group-type="author">
<name>
<surname>Burdin</surname>
<given-names>G</given-names>
</name>
<name>
<surname>Esponda</surname>
<given-names>F</given-names>
</name>
<name>
<surname>Vigorito</surname>
<given-names>A</given-names>
</name>
</person-group>
<year>2014</year>
<source>Desigualdad Y altos ingresos en Uruguay. un an&#x00E1;lisis en base a registros tributarios Y encuestas de hogares para El per&#x00ED;odo 2009-2011. Serie Documentos de Trabajo, DT 06/2014, Instituto de Econom&#x00ED;a, Facultad de Ciencias Econ&#x00F3;micas y Administraci&#x00F3;n</source>
</element-citation>
</ref>
<ref id="bib11">
<element-citation publication-type="book">
<person-group person-group-type="author">
<name>
<surname>Burd&#x00ED;n</surname>
<given-names>G</given-names>
</name>
<name>
<surname>De Rosa</surname>
<given-names>M</given-names>
</name>
<name>
<surname>Vigorito</surname>
<given-names>A</given-names>
</name>
</person-group>
<year>2015</year>
<source>Sectores de altos ingresos en Uruguay: participaci&#x00F3;n relativa y patrones de movilidad en el per&#x00ED;odo 2009-2012, Serie Documentos de Trabajo, DT 03/2015, Instituto de Econom&#x00ED;a, Facultad de Ciencias Econ&#x00F3;micas y Administraci&#x00F3;n</source>
<publisher-loc>Uruguay</publisher-loc>
<publisher-name>Universidad de la Rep&#x00FA;blica</publisher-name>
</element-citation>
</ref>
<ref id="bib12">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Cook</surname>
<given-names>DO</given-names>
</name>
<name>
<surname>Kieschnick</surname>
<given-names>R</given-names>
</name>
<name>
<surname>McCullough</surname>
<given-names>BD</given-names>
</name>
</person-group>
<year>2008</year>
<article-title>Regression analysis of proportions in finance with self selection</article-title>
<source>Journal of Empirical Finance</source>
<volume>15</volume>
<fpage>860</fpage>
<lpage>867</lpage>
<pub-id pub-id-type="doi">10.1016/j.jempfin.2008.02.001</pub-id>
</element-citation>
</ref>
<ref id="bib13">
<element-citation publication-type="book">
<person-group person-group-type="author">
<name>
<surname>Elson</surname>
<given-names>D</given-names>
</name>
</person-group>
<year>2006</year>
<source>Budgeting for women&#x00B4;s rights: monitoring government budgets for compliance with CEDAW</source>
<publisher-loc>New York</publisher-loc>
<publisher-name>UNIFEM</publisher-name>
</element-citation>
</ref>
<ref id="bib14">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Espino</surname>
<given-names>A</given-names>
</name>
</person-group>
<year>2013</year>
<article-title>Brechas salariales en Uruguay: g&#x00E9;nero, segregaci&#x00F3;n y desajustes por calificaci&#x00F3;n</article-title>
<source>Revista Problemas del Desarrollo</source>
<volume>174</volume>
<fpage>89</fpage>
<lpage>117</lpage>
</element-citation>
</ref>
<ref id="bib15">
<element-citation publication-type="book">
<person-group person-group-type="author">
<name>
<surname>Espino</surname>
<given-names>A</given-names>
</name>
<name>
<surname>Salvador</surname>
<given-names>S</given-names>
</name>
<name>
<surname>Azar</surname>
<given-names>P</given-names>
</name>
</person-group>
<year>2014</year>
<source>Desigualdades persistentes: mercado de trabajo, calificaci&#x00F3;n y g&#x00E9;nero. El futuro en foco: Cuadernos sobre Desarrollo Humano</source>
<publisher-loc>Montevideo</publisher-loc>
<publisher-name>PNUD</publisher-name>
</element-citation>
</ref>
<ref id="bib16">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Ferrari</surname>
<given-names>S</given-names>
</name>
<name>
<surname>Cribari-Neto</surname>
<given-names>F</given-names>
</name>
</person-group>
<year>2004</year>
<article-title>Beta regression for modelling rates and proportions</article-title>
<source>Journal of Applied Statistics</source>
<volume>31</volume>
<fpage>799</fpage>
<lpage>815</lpage>
<pub-id pub-id-type="doi">10.1080/0266476042000214501</pub-id>
</element-citation>
</ref>
<ref id="bib17">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Genser</surname>
<given-names>B</given-names>
</name>
<name>
<surname>Reutter</surname>
<given-names>A</given-names>
</name>
</person-group>
<year>2007</year>
<article-title>Moving towards dual income taxation in Europe</article-title>
<source>FinanzArchiv</source>
<volume>63</volume>
<fpage>436</fpage>
<lpage>456</lpage>
<pub-id pub-id-type="doi">10.1628/001522107X250140</pub-id>
</element-citation>
</ref>
<ref id="bib20">
<element-citation publication-type="book">
<person-group person-group-type="author">
<name>
<surname>Grown</surname>
<given-names>C</given-names>
</name>
</person-group>
<year>2010</year>
<chapter-title>Taxation and gender equality. A conceptual framework</chapter-title>
<person-group person-group-type="editor">
<name>
<surname>Grown</surname>
<given-names>Valodia</given-names>
</name>
</person-group>
<source>Taxation and Gender Equity: A comparative analysis of direct and indirect taxes in developing and developed countries</source>
<publisher-loc>London</publisher-loc>
<publisher-name>Routledge</publisher-name>
<comment>Chapter 1</comment>
</element-citation>
</ref>
<ref id="bib18">
<element-citation publication-type="report">
<person-group person-group-type="author">
<name>
<surname>Grown</surname>
<given-names>C</given-names>
</name>
<name>
<surname>Komatsu</surname>
<given-names>H</given-names>
</name>
</person-group>
<year>2015</year>
<chapter-title>Gender Equity and Taxation in Latin America and the Caribbean</chapter-title>
<source>Comparative Chapter. Non-published</source>
</element-citation>
</ref>
<ref id="bib19">
<element-citation publication-type="book">
<person-group person-group-type="editor">
<name>
<surname>Grown</surname>
<given-names>C</given-names>
</name>
<name>
<surname>Valodia</surname>
<given-names>I</given-names>
</name>
</person-group>
<year>2010</year>
<source>Taxation and Gender Equity: A comparative analysis of direct and indirect taxes in developing and developed countries</source>
<publisher-loc>London</publisher-loc>
<publisher-name>Routledge</publisher-name>
</element-citation>
</ref>
<ref id="bib21">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Guner</surname>
<given-names>N</given-names>
</name>
<name>
<surname>Kaygusuz</surname>
<given-names>R</given-names>
</name>
<name>
<surname>Ventura</surname>
<given-names>G</given-names>
</name>
</person-group>
<year>2012</year>
<article-title>Taxation and household labour supply</article-title>
<source>The Review of Economic Studies</source>
<volume>79</volume>
<fpage>1113</fpage>
<lpage>1149</lpage>
<pub-id pub-id-type="doi">10.1093/restud/rdr049</pub-id>
</element-citation>
</ref>
<ref id="bib22">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Kieschnick</surname>
<given-names>R</given-names>
</name>
<name>
<surname>McCullough</surname>
<given-names>BD</given-names>
</name>
</person-group>
<year>2003</year>
<article-title>Regression analysis of variates observed on (0, 1): percentages, proportions and fractions</article-title>
<source>Statistical Modelling: An International Journal</source>
<volume>3</volume>
<fpage>193</fpage>
<lpage>213</lpage>
<pub-id pub-id-type="doi">10.1191/1471082X03st053oa</pub-id>
</element-citation>
</ref>
<ref id="bib23">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Nelson</surname>
<given-names>JA</given-names>
</name>
</person-group>
<year>1991</year>
<article-title>Tax reform and feminist theory in the United States: incorporating human connection</article-title>
<source>Journal of Economic Studies</source>
<volume>18</volume>
<pub-id pub-id-type="doi">10.1108/EUM0000000000158</pub-id>
</element-citation>
</ref>
<ref id="bib24">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Ospina</surname>
<given-names>R</given-names>
</name>
<name>
<surname>Ferrari</surname>
<given-names>SLP</given-names>
</name>
</person-group>
<year>2010</year>
<article-title>Inflated beta distributions</article-title>
<source>Statistical Papers</source>
<volume>51</volume>
<fpage>111</fpage>
<lpage>126</lpage>
<pub-id pub-id-type="doi">10.1007/s00362-008-0125-4</pub-id>
</element-citation>
</ref>
<ref id="bib25">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Ospina</surname>
<given-names>R</given-names>
</name>
<name>
<surname>Ferrari</surname>
<given-names>SLP</given-names>
</name>
</person-group>
<year>2012</year>
<article-title>A general class of zero-or-one inflated beta regression models</article-title>
<source>Computational Statistics &#x0026; Data Analysis</source>
<volume>56</volume>
<fpage>1609</fpage>
<lpage>1623</lpage>
<pub-id pub-id-type="doi">10.1016/j.csda.2011.10.005</pub-id>
</element-citation>
</ref>
<ref id="bib26">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Paolino</surname>
<given-names>P</given-names>
</name>
</person-group>
<year>2001</year>
<article-title>Maximum likelihood estimation of models with beta-distributed dependent variables</article-title>
<source>Political Analysis</source>
<volume>9</volume>
<fpage>325</fpage>
<lpage>346</lpage>
<pub-id pub-id-type="doi">10.1093/oxfordjournals.pan.a004873</pub-id>
</element-citation>
</ref>
<ref id="bib28">
<element-citation publication-type="book">
<person-group person-group-type="author">
<name>
<surname>Rodr&#x00ED;guez Enriquez</surname>
<given-names>C</given-names>
</name>
<name>
<surname>Gherardi</surname>
<given-names>N</given-names>
</name>
<name>
<surname>Rossignolo</surname>
<given-names>D</given-names>
</name>
</person-group>
<year>2010</year>
<chapter-title>Gender equality and taxation in Argentina</chapter-title>
<person-group person-group-type="editor">
<name>
<surname>Grown</surname>
<given-names>Valodia</given-names>
</name>
</person-group>
<source>Taxation and Gender Equity: A comparative analysis of direct and indirect taxes in developing and developed countries</source>
<publisher-loc>London</publisher-loc>
<publisher-name>Routledge</publisher-name>
<comment>Chapter 3</comment>
</element-citation>
</ref>
<ref id="bib36">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Rossignolo</surname>
<given-names>D</given-names>
</name>
</person-group>
<year>2018</year>
<article-title>Equidad de g&#x00E9;nero del sistema tributario en la Argentina: estimaci&#x00F3;n de la carga fiscal desglosada por tipo de hogar</article-title>
<source>Revista de la CEPAL</source>
<volume>124</volume>
</element-citation>
</ref>
<ref id="bib29">
<element-citation publication-type="journal">
<person-group person-group-type="author">
<name>
<surname>Smithson</surname>
<given-names>M</given-names>
</name>
<name>
<surname>Verkuilen</surname>
<given-names>J</given-names>
</name>
</person-group>
<year>2006</year>
<article-title>A better lemon squeezer? maximum-likelihood regression with beta-distributed dependent variables</article-title>
<source>Psychological Methods</source>
<volume>11</volume>
<fpage>54</fpage>
<lpage>71</lpage>
<pub-id pub-id-type="doi">10.1037/1082-989X.11.1.54</pub-id>
</element-citation>
</ref>
<ref id="bib30">
<element-citation publication-type="report">
<person-group person-group-type="author">
<name>
<surname>Stotsky</surname>
<given-names>J</given-names>
</name>
</person-group>
<year>1996</year>
<chapter-title>Gender bias in Tax systems</chapter-title>
<source>IMF Working Paper, No. 96/99.</source>
</element-citation>
</ref>
</ref-list>
<fn-group>
<fn id="fn1"><label>1.</label><p>Percentile values were provided by the Economic Institute of the Faculty of Management, Universidad de la Rep&#x00FA;blica and are based on administrative records of the Tax Office.</p></fn>
<fn id="fn2"><label>2.</label><p>The ECH inquires whether or not private wage earners partially evade social security contributions. We did not take into account this information because it would require further assumptions about the percentage of evasion. In any case, we do not expect that assumptions about partial evasion based on this information have significant effects on our results: 58% of workers were private wage earners and among them, only 6% declared to partially evade.</p></fn>
<fn id="fn3"><label>3.</label><p>We also run OLS estimations that are available by request. The estimated effects have the same signs than under the zoib estimation though the magnitudes are a bit different.</p></fn>
</fn-group>
</back>
</article>

`;

const convertHandler = async (): Promise<string | Result<string, ApiError>> => {
  try {
    const node = await read(file, 'jats');
    return await dump(node, 'json', {
      isBundle: false, isStandalone: true, shouldZip: 'no', format: 'json',
    });
  } catch (e) {
    return Promise.resolve(Result.err<string, ApiError>({ type: 'not-found', content: e }));
  }
};

export default convertHandler;
