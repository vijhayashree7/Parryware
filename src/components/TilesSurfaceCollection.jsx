import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const rawUrls = "https://images.openai.com/thumbnails/url/MnpHenicDcnhEoEwAADgJ6qIUu6cU41ykq6Trj8uU7ZFrTZsPZT38TZ8f7_vB3FO2VzTygb2kvLyqvBLM1FvjBccQxW2D42hllLc3Jbd4n_z1f5qb2DSSlL2IjCbMSYkSIqcKE7Q1jYyUlPWT2xJU98Zw0xk0grWgzV64xzoVX_Qh800mQBknD03d7qTzzrh-NmrjiI_RXEFBBmHUERKDSpG73bIwHFree47Pq5-QW89-Q,https://images.openai.com/thumbnails/url/cie5R3icDcnbCoIwAADQL_JGBSpEaNgy1LzAxL3VnJuSc7ol7nf6q_6mzuv5fphSQvqWRThetFCkNdST2yaV6qF6bOJptCSbhOg5Pc3H__lB1noAV53TGTDabs643DWIUtYUG_RokWdr1Q8gD2oqtetwt0eNpGwfby9xKXASD2ubXOlBgBkOISgJXMqOnt-z7UUa1fFEap3sUApXhfaaGeEPcFY6sg,https://images.openai.com/thumbnails/url/_VMXZnicDcnbCoIwAADQL0qJLmQQoUamiLeiZi-h29xmc5u6LPuo_qe_qfN6vh-qterXpokF7EalMZroUkwN0utCM2hA2Zg9lUoxQbbt5n9rO0KWB7OUumFu93LVPUc9vhtWcxAAhIqOl3LWzIiNkTXs_BvFbeWlwR7Ey-ws3PtgMf_BL4eVK8jRKso0qZ-vK2fz6HUit2texSF3kMdE6CR6fxIBGJfVATqgTBY_yDs_5A,https://images.openai.com/thumbnails/url/aepPSXicDclJDoIwAADAFwFxjZAYg7JEQIwFFU8ESmmB2JZSBPyNz_I3Otf5foiUvDM0DVEoJi5RocicLlTcyUxWUIXsqXWEcV5RvGu3_zPMsNBdCLDdXKEVHpmuWJlV9nwEwgHpzATsTUO5V8azH9gRJW788Mwyb25msUnrIHIr2Yu6zRIIhtSKvRwtXyK4DwSfomaicH0ZEofM_frQo3TFfkIaOu8,https://images.openai.com/thumbnails/url/4785yHicDcltDoIgAADQE6WWK9GtNZaFZlr5sZX_FEGZoShM6zrdqtvU-_u-n0YpIR1dJx0e30KRaqHKbqXVUhWKYQ33XJdNLwTr6t2w_Z8Do8pGOIUet_csUwTQxOVFjWw00tliBxbcgFfS81A_2ksB0hQExuxuJv-UDNDIOfHNGMrwubahCGE-UQPh2Lu2chlRP4sCFAvrKMYXmVtLmOz-AyTlOU0,https://images.openai.com/thumbnails/url/DhEgxXicDclJDoIwAADAFwlYAZXEGBFZAkUCCYIXAy1SjLaFVlye46_8jc51vh8iJReWqjYUDS8uGzyRNdWUVshKdkhB7KYKwjjvaLvuV_-zNjFeeih1NNrahbdPsqqQvAm7DBUtxEFisgMY4PnZh03lh8I-msWCBie3TuRDm86BDghnEQYER5kJ7a0dAPddTjwn9VmeX8ls1O47w4AXOOplWcY_KK44kA,https://images.openai.com/thumbnails/url/h-pN1XicDcnbCoIwAADQL1JR00qIGCXzQgb5YOtl5Ny869Qhbn_TZ_U3dV7P91MJwRfPMOhAZskFLTSRD7ZeLuItaqKTsTeWauS8HsrzdPqfB5LiCMkDvrBsO42m2eoDG8SZCNiGya1XqpzZdQnviLYuO3RkR5EbmvOGJ4DJlGQZL0CAmkvuR5NiqHkirBLGbJg6ZhXGc2ftJfDXyHI2CXc_Xlc6Tg,https://images.openai.com/thumbnails/url/OzpMbXicDclRCoIwAADQE6WlYSpECM2pqwlimf7E3EwHazO3ILtNx-o29X7f9zMYM-rQtjtJp3k0HVuYVrpWrw0xnFpU3W09qHHkst89tv8LI8wCSEsGHwDCLpeZCwqQJvMM6kpPVUJ90RByKg_pYFZv_4YHJgKTr1F0uWJFHYx4K0COo8bDGe5eR5XvFXdqDRHuEYnjZ9PGZ8aEtxEFWf4ADSQ5TA,https://images.openai.com/thumbnails/url/sQZOiXicDcnbCoIwAADQL_IKYgoRprkZMTNEohfZxdyGzZkr8Uf6t_6mzuv5frgxeo4dp1P0uWrTMcsQ5dv9bLAR1Kbjw5n5qLVQ_W7a_i9OEIsArXzXhBldlmkNSRJMzZDjKhOeXGiTHogXwUJGeFO3IHhBt7zVTFyB3sNy_y5W1J5PaBg0v1jiKJhMM4IALj2c31XJocx_gqc1Pw,https://images.openai.com/thumbnails/url/OzpMbXicDclRCoIwAADQE6WlYSpECM2pqwlimf7E3EwHazO3ILtNx-o29X7f9zMYM-rQtjtJp3k0HVuYVrpWrw0xnFpU3W09qHHkst89tv8LI8wCSEsGHwDCLpeZCwqQJvMM6kpPVUJ90RByKg_pYFZv_4YHJgKTr1F0uWJFHYx4K0COo8bDGe5eR5XvFXdqDRHuEYnjZ9PGZ8aEtxEFWf4ADSQ5TA,https://images.openai.com/thumbnails/url/WtawYHicDcltCoIwAADQE_kRKDQhYjBbSo0hA9M_MqdtJup0Q9KDdLduU-_v-36UtdpEnteOYtm0bRvH1qPvSmO57YQrpsEzatK6G-V5Pv0vgqQBWGSF9IMVxUT5CKwx5PMzLBMBGO8Zub76GCYdETtLWZ0DlclwWALcYqH2ylT0Mt0DVCCQw6osHwfeHA2ltw0XifNOLRU_eu81LA,https://images.openai.com/thumbnails/url/qyBKtHicDclRCoIwAADQE6UfI5tCRDi1MkxFM_yR3HQ6aZqbrHaQ7tZt6v2-76eTchKOaTYcz-9JNmQlaw4MKuRd9tjA48MU3ThNPae75_Z_zj4idoATVkNkV4HFDjrTy6bt2dr1wS1Vl2UeSB6KmJZQRzx7uUd-glQLt2fUz9OCx2dPuTIZB1Hmlhd5igSowrAFTIPiikKkfs0pNoE,https://images.openai.com/thumbnails/url/PnoUCnicDcndDoIgGADQJzL7vbCttRaDhj9FtdQrlwqoW0DyzaSH6n16mzq35_tpAIxd-z5XVe8M8NqDUk0n0sId2mpS6YdvG21Mq-T2ufnfepfUAamuRKQn2kUHboZ-iDyHMYLA1c0TKLslqDjh5TkU6uJmy4Rd5kMRZlc76JKIbMTT7uaJBYsllzyHaGFnWu1HRzOZkziJypq_gXXOshCdU_d65T1dIcyPP2LyP1A,https://images.openai.com/thumbnails/url/u-3VIXicDclZDkNAAADQE1kSW0mapvYQ21DR_ghDBg0zahSX6n16m_b9vu-no5QsGse1E3wdhLYNQ-tJYNFCK9pDFuKRWzpMSD-hy3z-n3YNG9WBiTJXjASNrpAicRihiEpdIcB_J2IcuEOLwJbGafV0mrVGrkFzZg6sZW_74bHKDh_td28tM8HTgTraxLesTMUI-g4stlMcYsU8wtuKMLBsGXsuTszM5_P8Bw7dPYE,https://images.openai.com/thumbnails/url/PyhFfXicDcnbCoIwAADQL0pLjVKIqDanUGZ2UXoZOi8burm2IfQj_Vt_U-f1fD_UGKkD224EUW9pmnpmKuFYnTalYcQiI7c1HaVkotu-Nv8LdkntI3JThYfOskmRrwlmHp3gxSF97y4Mz-9oFQEgsrg90TlYhvJxZU-VtXhfVDRWDOABuEc8JusD5KDGE8nDd1amXhfBHrp8-AGVCTWD,https://images.openai.com/thumbnails/url/vzaUAXicDclJDoIwAADAF5XNhC0xBgFZItVIJMUbtFCILIXWIPzGZ_kbnet8P40QjNuyXA14XpmoCBDloEmUi0K0WMJjL_NmZKwd6GHa_892ILECfBOh7oZzfQ_0BcdbklqAWuoEzGV7eqQDHOSooE7IMVOvcxZC5ZKQvqu9KKXU0E7o-Ch4djZovEG_dPxX9qa62_lAgyhflEAgsFtVNzJ_3kg4Dg,https://images.openai.com/thumbnails/url/nds_W3icDcnbDoIgAADQL0qXa3nZWlNZFqUP3by8KSJgCBRsal_Sr_U3dV7P90ONUTqwbSzQa1YGtwvTCMci2tSGIQvJwdZUKsUE2T43_wvCrPUTdOVxijpQs-oBRp36B76fOb4l2aCLd0nysusYvPA1jHazq5y7f8NUNlM_LT3Ue6cihjgGZyZzFVVixA6doTseM7bqQwIiHf4AWCc3Zg,https://images.openai.com/thumbnails/url/u9B7O3icDcndCoIwGADQJ0rREkyI8HeRpVgrpndtmlNwzu1Dsgfp3XqbOrfn--EAUnum2QimFglNvQIqbKPV8ICOGWwcTM1HKTvR7qfd_zw_q7eI4bJ_xvlSJKqaJ-RaFFNCZOAkZN2UWJ2vzigBQapRv9G8OB3wHUeDzJLQQm7t0_ydvggNcDzNRydkl5tgnKiicmNuR8sPsyI13w,https://images.openai.com/thumbnails/url/P__7fHicDcnbCoIwAADQL_JSupVChJGzKIZo3p7CNtNZ6mwTzb_ps_qbejtwvp9KSi5sTSta8npzWVBF3tqlWgqZS0ZU0jWaqDrOWVtu-83_bAdTyyMhtep1ytigmwinBkvy-lwziaN4pgjoYeL1AJmLnGIwA__vx0UZdpWzotk07EHwHGMYoj4rTiw6Ntg1ruLg-lOk3CHsYOmOMhBidHD0A93oOOA,https://images.openai.com/thumbnails/url/IBh3_nicDcnbCoIwAADQL_KCli0hQgUVMlNGwnwRd8kLNZcbTfuc_qq_qfN6vp9eKSF9y2KczKtQjBoKc8fspGrVQEwyPSzZT0IMvDs-D__zg5zuEwLxubYpcpssLDSwX3yHskgLiMeYlQp5SU3itXFKsHnnGWSEk1p7S7V2KB0vd7cALE0pmma70QAb8w20zmmr-ym8VlLDJcZGHIhoQ4n8AUSAOfE,https://images.openai.com/thumbnails/url/wL3J5HicDclbCoJAFADQFamhVKMQkQ6aj4SiROdH1PEVo97R0XI5Lavd1Pk9308jBEyGopR9Ma4gSiqJvFflehKZaAu5GDplagaAtq-P_PA_4xRS3SmuQQBoUL0AP4dddeOwh5LZvsXSKJRUR9NH4aa-lyB38-LxhTjv9WHNc461hUfjIzErutpASnzHsTXjLdfMWGcdGpeZhMw9k4pmFLQJ_QACnDm-,https://images.openai.com/thumbnails/url/Q1HdF3icDclJDoIwAADAFwmyBkiMAQm4RcOiQS4EWiwQWkopKDzHX_kbnet8PxXndLBEsSSAzZSXcMULshbQwHNeAwF0WByqjtKaoG2_-Z9lX6Dpg7BZObYXS-l4wHa0uK3c5K4_Rg8YBpqhpv2YQU1Oj_zs07d5N2K3NhOEO4g75CgNKXZhwE-Gpj2XSWVUl6Ayetk-vjJ2a9GQ64k6s9J7zdMPJPg6Jg,https://images.openai.com/thumbnails/url/t0VVk3icDcnbEkJAAADQL8KQUcw0jcLqMlHk0htrc4ndxVJ8Vb_T39R5Pd9PwRjtNUFAGHYTZSjjWIpFPu9ZwkrIQ9IIfUEoLXG-adf_0_RzpgLobSuFtQAPYb1S_XtCdAdY1RzGh72FcBAtDIjexB1lrJq2Lzb1ZYwbG-BlgZ5cGiXAhIVCby2LPSSFSmm5RhqP7RUc5XKqmoBOL6U-SQ-1uzlcvyNg6Mx6zvMf0bE_3A,https://images.openai.com/thumbnails/url/F2ymfnicDclJDoIwAADAF7EmHjQxBjBBFEFkMXIxtkUpXShQ1lf5HX-jc53vp5RSdBtNKzhsZyELpEjADfXdyafEUIU107qyFgLz967Z_m9jBWjtwohU7MA9l5hpxBpq27m_MI6m2hvKAgX-XrEwzeFA8SNuiNlXJAStng5tkng-X2LKdO8G4tfVQTwrh8YAN3oc9ciJJyZFApQxzDA4Z6sKPWkw38_0QvoTtn5YvkGE,https://images.openai.com/thumbnails/url/P8Vxb3icDclJDoIwAADAF7EviSTGgCAKbkCowYuBshWkFFtC_Y6_8jc61_l-WsYItSSpwvD1JqwqBVZgRWwoyxmCIhwHibYjIQg3m2n9P8s-lysfRuahmENHWTyc8SC42FqqaNzrAa_io4vjRk1TtLgyERi4lXrwRLwG573Ka3PIpuCqDzKhu96pjS6_R49tZNIx08ECZgjpknQo9k_cyLUw-QE1Kzn2,https://images.openai.com/thumbnails/url/lfHhIXicDcnbCoIwAADQL0rNhFSIcGPOwGxWSPSm8zYvc7aN9Ef6t_6mzuv5flqlhPRNs-L0tQpVlRtV8J3RSJUrRg06jaZsJyEYb47z4X9-kJQeprfaXnAHz1uXpu-xeMNeXMsLcWLQzTqDkYeHBYleFiR3EYG2HACogaN5lLDHoFFIuyki-4Dx8b7OAuMsDZ-OFVr6VMXoB7TCNcU,https://images.openai.com/thumbnails/url/eK5NhXicDclRCoIwAADQE6llgSlETEFXgZlaE39CN50KuukGtp2kq3Wber_v--mk5MKzrGbCi-KyIYasp61Jhaxkj03MRkt0jPN-oqf5-D8PxMSN8J3dBjbQXevbTaQhxdfUr4wXEVqFsFSte9BnAGaV1QBAXpSKFAgNLJZBnWfr5h3Q55okeR_MS-oADH2CLo5G414-QnsXrj9K3jck,https://images.openai.com/thumbnails/url/kxSPfnicDclhCoIwGADQE6WCpChEaBMrxFqITP_Z3NRwc2tfoh2ku3Wber_f99MDKBPaNpP0uSpg7Qbu0rU6Aw0M1KKTsE0_KTXIbq93_wujvA1SiiVCNePlK9ayWiqewFj4MaDmKM3MvdE8tiXpM3B0oATF3iRQcXPIolM-mJScapbP2RW7F0Bj5J-rMukYF-81Ic2hxj_4Tzck,https://images.openai.com/thumbnails/url/FUYEtnicDcnbDoIgAADQL8LLnK7cWutiuWUXcxL14gQRLBUE1sov6df6mzqv5_vhxkgd2jbtiXpLQytgcO9ZTJvSNMQiorM1F1I2PZsPs_-Fi0M13ZIziKG4txcfju4ug892EkRpoBIo8IpmzKu1k3DOixgoiB-nhNbX2sdykymzPJZwyLWHOjkiogAubnmwdpuOjRHbGwehV57-AB1fNyY,https://images.openai.com/thumbnails/url/25CRO3icDcldEkJAAADgE-FhMTHTNNKOKKuNKbyYtQz6WctuSbfpWN2mvtfv-2ml5MLWtJrRceayrhRZMqA2QhLZUZX2d020Pecda1bD8n-2gyrLo5j4REmBGViSbKfYEGFeOxcOk55iD6YToQ-Qu4F49cA0WYbGSc_8WCDc7Ypsz040fqKhgQvMivEahecA3YZ4XVbvyNvoyewDeDDc5CjwDxI5OYo,https://images.openai.com/thumbnails/url/gFMOq3icDcltCoIwAADQE6lkpk2IEGTOnFqkYj9rfk3cnG6G3qSrdZt6f9_30yklpGsYNSfzJlRdaerFTb2V6qko0cnIDNmNQlDenqfT_1wvqUBAsqrEwCp95DBsWfEjvUi47JPFHrociz64UoKJc0OEDWmh3kPOxh7BQDMr0Kc-aKaVwPgeljYKVx4FjaBwl0SHbJwHuB0L7wfoizXj,https://images.openai.com/thumbnails/url/GjCauHicDcpRCoIwGADgE6mlEihEGOnEMmjMmr2E_eo2y7m2veRJulq3qefv-364tcrEntdJ0G9lu9axd7l0mbGNFeDCNHqGT0oJyTav9d_i5NhGCEgoskYGlzqjKRT-GaocVWwh4AEM1_-_2yezeYbbiBjMb0XDriHV-SHlYLQQvtS9X64CjAgOsenpMGsyDsaBLENTSU8_FAA2xw,https://images.openai.com/thumbnails/url/8b451nicDclbCoJAFADQFamTwmRChCloRGmUr34G5-EjGTW9UrqSttZu6vye76cC6EdL00TLhrkHwRWgLVLLEXKomco6qY1V1_d1W-6e2_9Z9plvPHYp0R5H3DMfBn3djYR1aHYQjQonH1JdObhyGmkqpf8uzcknwYDXxKOdkekiWxo3E3GIBljhE1-apAhB6lOEiINv8RGTa2D_APZYNek,https://images.openai.com/thumbnails/url/CgBD1HicDclJDoIwAADAF7FoMAiJMRDZRMAGwcgNS9kpFQpSnuOv_I3Odb6fklIyqoKAMBwYoSjj6BNv-WKkKa0gD_tOGMuekAoXx9fhf6rmZ4oFQZAZGJitm4iP5a3YWY5hUelr7-RpBNIwiVxts5gjri65LLVyHfQDmq2mbm6iYneTZnv-lXgxY75khbW-1miad6cziQtnjwNE7jNgnMHy4QePsDtb,https://images.openai.com/thumbnails/url/N9Xyc3icDclJDoIwFADQE8kUDEJiDDOIEtEEhB0UKIOWSj8BuY3H8jb6tu_7aQAo03i-Imh8U6jKDRRE4jCDHFrEoeHJs2agtCX48Nr_T9PDUnXRdTRLwyErE4soIfYSGqKxBpPTxIFoKR6WMn9NTugherZwd5Ol7iQZjCgrj2BNytb0seRfaKCkyVmNZRP1PZ2ZnqadMFdTvmuq7AYE27X-A-T5ORs,https://images.openai.com/thumbnails/url/1dzUkXicDcndCoIwGADQJ0q罕ShQwRmmJETqdS6EZt_Czbl9Eb5I79bb1Lk9308PIJSr6w0nchbQ1At4cKR1CiqgRCMj01U_CkF5t502_3M9XDshOeNryQ4yZnLfnhy8Lli24HE4mdbqguQrMAIaZYKn6Bn4arDb0jbVLI3aLKNkQOEkYelVNwHCsCy6S1HRF_E9yXP_iNlb_gB7CjUL,https://images.openai.com/thumbnails/url/la0P9HicDcnbCoIwAADQL_JSaqUQoaTzkiKmkb6ETZkrp9OtRX1Jv9bf1Hk930_HOWWWorQDnF-Ut43Er4MmI8ZrjqEMR6KwbqQUD2g3bf9n2UljAnj0H_FhQZa27riqQauaEe92IeMdSjDZx3kgYBj7BgjPvUmCwvE2WmpgtXzPq1n0oECnNMpsgNbmy0ORqNzZrUo8Cd3PpjrJnz_P2TW_,https://images.openai.com/thumbnails/url/9OZdunicDcnbCoIwAADQL_IShakQscosK5kziXwRN9dmpfMyjfUh_Vt_U-f1fD9cyqZ3DYPWpFONpIUmcW3qrJe5LIlORGX0XDRNWbNlu_ifC8LC8UkUmOvxRDp7UFY2jVKIJt6l2pwhJzRpIY73aL7Lq0AB8eAvRzB8GEKaYR8MFhTq9rbj1faJypGRjAdeeteuydEcSYjRG8x-tDI2VA,https://images.openai.com/thumbnails/url/tmGn33icDcnbCoIwGADgJ_KUiShEeIYEY9S86EZ0Hpe6tX9K-ji9VW9T3-33_fRScnA1rZmJ2LhsakVWs6F2IEs5EJWwSYOecT7M3fl1-p_rZbWTkLsd4PWYectmZyktoU9oAYXjKwW2lmtrMQRBvKc5RfGjFe8JGOy1J1eC9QtCvlGSBw4jccijAY9GZ3p8LW_tFhoVEiNgSiz9iWw2NeYPbxA6kA,https://images.openai.com/thumbnails/url/i4mMH3icDcnbEkJAAADQLwoRyUzTaHYqM6gU4cWwLkuxK7tun9Nf9Td1Xs_3gyglncbzWQPfE6FZuqBJI3BFR2NaQg7imu8QJqRsil27_Z-m2-nmCB31LNoeNgGsrFdrIDOo5Mke_WKdi_egbAc8SOMKeaVo9SzU0fUhATKFWGC-KsdSdQFk79xMNhzkmeitmMez-7SXStPXNQNT5AJXKU61kUQ_cdY6yg,https://images.openai.com/thumbnails/url/-ASuBnicDcltCoIwAADQE6lk2lSIEK1ExY_QbP3LKdtMN3WL0IN0t25T7-_7foiUo3A0rWVoXkbZNoqs2VbFQj4kRSrigyYIH0fK8GHa_89xk8Y-o4Ia8xQMIFq4mT_BTRHvK_LQMYWhPelLBDaD4bk-qLh1ecHy0tcJYWaXyiSMu36lgYC4rmKmF1m5UiO3WgL9033iO9fM8A-Y1jWT";

const imageUrls = rawUrls.split(',').map(s => s.trim()).filter(Boolean); // removes empty strings

const categories = [
  'tiles-floor',
  'tiles-wall',
  'tiles-vitrified',
  'tiles-ceramic',
  'tiles-porcelain',
  'tiles-mosaic',
  'surface-marble',
  'surface-granite',
  'surface-quartz',
  'surface-wooden-finish'
];

export default function TilesSurfaceCollection() {
  const { categoryId } = useParams();
  const { cart, addToCart, removeFromCart, updateQuantity, setIsSidebarOpen, getProductMin, getProductStep } = useCart();

  const catIndex = categories.indexOf(categoryId);
  
  if (catIndex === -1) {
    return <Navigate to="/tiles-and-surface" />;
  }

  const getProducts = () => {
    const defaultPrices = [1299, 1499, 1899, 2399, 2999]; // per sqft
    const defaultMRPs = [1599, 1899, 2399, 2999, 3699]; // per sqft
    
    // Gracefully handle mapping URLs
    const startIndex = (catIndex * 5) % Math.max(1, imageUrls.length);
    
    // Create a beautiful properly cased title from category id
    const fmtTitle = categoryId.replace('tiles-', '').replace('surface-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return [0, 1, 2, 3, 4].map((i) => {
      const imgIndex = (startIndex + i) % imageUrls.length;
      return {
        id: `${categoryId}-${i+1}`,
        name: `Premium ${fmtTitle} - Model 0${i+1}`,
        description: `Experience uncompromising quality and elegant modern design perfectly tailored for your luxury architectural needs. Built with extreme precision.`,
        price: defaultPrices[i],
        mrp: defaultMRPs[i],
        image: imageUrls[imgIndex] || "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200", // fallback
        rating: 4.5 + (i * 0.1),
        reviews: 210 + (i * 35),
        unit: 'sq. ft.'
      };
    });
  };

  const products = getProducts();

  return (
    <div className="min-h-screen font-sans w-full overflow-y-auto bg-transparent relative">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#A68966]/10 to-transparent pointer-events-none"></div>
      {/* Glassmorphic Header */}
      <header className="bg-white/40 backdrop-blur-md h-[70px] flex items-center justify-between px-6 text-gray-900 sticky top-0 z-50 border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link to="/tiles-and-surface" className="hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">{categoryId.replace('tiles-', '').replace('surface-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
        </div>
        <div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setIsSidebarOpen(true)}>
          <ShoppingCart className="w-7 h-7 text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-[#E33939] text-white font-bold text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center shadow-md">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-4 md:p-8 pb-16 mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 justify-center">
          {products.map((product, i) => {
            const cartItem = cart.find(item => item.product.id === product.id);
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-[28px] p-3 shadow-sm hover:shadow-lg flex flex-col transition-all duration-300 border border-gray-100/50"
              >
                <div className="relative w-full h-[260px] rounded-[20px] overflow-hidden bg-gray-50 flex items-center justify-center mb-1 group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#222222] text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <Star className="w-[12px] h-[12px] fill-[#F5A623] text-[#F5A623]" /> Prime Pick
                  </div>

                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                    <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                  </div>
                </div>

                <div className="px-2 pt-4 pb-2 flex flex-col flex-grow">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[22px] font-extrabold text-[#111111] tracking-tight">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[13px] text-gray-500 font-medium tracking-wide">
                      / {product.unit} (List price)
                    </span>
                  </div>

                  <h2 className="text-[15px] font-medium text-[#222222] leading-snug truncate whitespace-nowrap overflow-hidden text-ellipsis mb-5">
                    <span className="font-bold">{product.name.split(' ')[0]}</span> • {product.name.substring(product.name.indexOf(' ') + 1) || product.description}
                  </h2>
                  
                  <div className="h-[1px] w-full bg-gray-100 mb-4"></div>
                  
                  <div className="flex items-center text-[13px] text-gray-600 font-medium mb-4">
                    <div className="flex flex-1 items-center justify-center gap-2 border-r border-gray-100">
                      <Star className="w-[16px] h-[16px] text-gray-400" />
                      <span>{product.rating} Rating</span>
                    </div>
                    <div className="flex flex-1 items-center justify-center gap-2">
                      <svg className="w-[16px] h-[16px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      <span>20 {product.unit} min</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-gray-100 mb-4"></div>

                  <div className="flex items-center justify-between text-[13px] text-gray-500 mb-6">
                    <div>By • <span className="text-gray-900 font-semibold underline underline-offset-2">Parryware</span></div>
                    <div>In Stock</div>
                  </div>

                  <div className="mt-auto">
                    {cartItem ? (
                      <div className="w-full h-[52px] flex items-center justify-between border-[1px] border-gray-800 rounded-full overflow-hidden bg-white text-gray-900 shadow-sm">
                        <button 
                          onClick={() => {
                            if (cartItem.quantity <= getProductMin(product)) {
                              removeFromCart(product.id);
                            } else {
                              updateQuantity(product.id, cartItem.quantity - getProductStep(product));
                            }
                          }}
                          className="h-full px-5 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          {cartItem.quantity <= getProductMin(product) ? 
                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} /> : 
                            <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                          }
                        </button>
                        <span className="font-bold text-[16px] px-4">{cartItem.quantity} {product.unit}</span>
                        <button 
                          onClick={() => updateQuantity(product.id, cartItem.quantity + getProductStep(product))}
                          className="h-full px-5 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center border-l border-gray-200"
                        >
                          <Plus className="w-[20px] h-[20px]" strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full h-[52px] rounded-full text-[15px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] text-white shadow-md transform hover:scale-[1.01]"
                      >
                        Add to Cart ({getProductMin(product)} {product.unit})
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
