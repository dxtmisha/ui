import { computed, ComputedRef, isRef } from 'vue'
import { GeoAbstract } from './GeoAbstract'
import { GeoIntl } from './GeoIntl'
import { AssociativeStringType, GeoCodeType, GeoType } from '../constructors/types'
import { Geo } from './Geo'
import { forEach } from '../functions/data'

export type FlagItemType = {
  icon: string
  country: string
  language: string
  value: string
}
export type FlagReturnType = ComputedRef<FlagItemType | undefined>

export class GeoFlag extends GeoAbstract {
  static flags = {
    AD: require('../media/flags/AD.svg'),
    AE: require('../media/flags/AE.svg'),
    AF: require('../media/flags/AF.svg'),
    AG: require('../media/flags/AG.svg'),
    AI: require('../media/flags/AI.svg'),
    AL: require('../media/flags/AL.svg'),
    AM: require('../media/flags/AM.svg'),
    AN: require('../media/flags/AN.svg'),
    AO: require('../media/flags/AO.svg'),
    AQ: require('../media/flags/AQ.svg'),
    AR: require('../media/flags/AR.svg'),
    AS: require('../media/flags/AS.svg'),
    AT: require('../media/flags/AT.svg'),
    AU: require('../media/flags/AU.svg'),
    AW: require('../media/flags/AW.svg'),
    AX: require('../media/flags/AX.svg'),
    AZ: require('../media/flags/AZ.svg'),
    BA: require('../media/flags/BA.svg'),
    BB: require('../media/flags/BB.svg'),
    BD: require('../media/flags/BD.svg'),
    BE: require('../media/flags/BE.svg'),
    BF: require('../media/flags/BF.svg'),
    BG: require('../media/flags/BG.svg'),
    BH: require('../media/flags/BH.svg'),
    BI: require('../media/flags/BI.svg'),
    BJ: require('../media/flags/BJ.svg'),
    BL: require('../media/flags/BL.svg'),
    BM: require('../media/flags/BM.svg'),
    BN: require('../media/flags/BN.svg'),
    BO: require('../media/flags/BO.svg'),
    BQ: require('../media/flags/BQ.svg'),
    BR: require('../media/flags/BR.svg'),
    BS: require('../media/flags/BS.svg'),
    BT: require('../media/flags/BT.svg'),
    BV: require('../media/flags/BV.svg'),
    BW: require('../media/flags/BW.svg'),
    BY: require('../media/flags/BY.svg'),
    BZ: require('../media/flags/BZ.svg'),
    CA: require('../media/flags/CA.svg'),
    CC: require('../media/flags/CC.svg'),
    CD: require('../media/flags/CD.svg'),
    CF: require('../media/flags/CF.svg'),
    CG: require('../media/flags/CG.svg'),
    CH: require('../media/flags/CH.svg'),
    CI: require('../media/flags/CI.svg'),
    CK: require('../media/flags/CK.svg'),
    CL: require('../media/flags/CL.svg'),
    CM: require('../media/flags/CM.svg'),
    CN: require('../media/flags/CN.svg'),
    CO: require('../media/flags/CO.svg'),
    CR: require('../media/flags/CR.svg'),
    CU: require('../media/flags/CU.svg'),
    CV: require('../media/flags/CV.svg'),
    CW: require('../media/flags/CW.svg'),
    CX: require('../media/flags/CX.svg'),
    CY: require('../media/flags/CY.svg'),
    CZ: require('../media/flags/CZ.svg'),
    DE: require('../media/flags/DE.svg'),
    DJ: require('../media/flags/DJ.svg'),
    DK: require('../media/flags/DK.svg'),
    DM: require('../media/flags/DM.svg'),
    DO: require('../media/flags/DO.svg'),
    DZ: require('../media/flags/DZ.svg'),
    EC: require('../media/flags/EC.svg'),
    EE: require('../media/flags/EE.svg'),
    EG: require('../media/flags/EG.svg'),
    EH: require('../media/flags/EH.svg'),
    ER: require('../media/flags/ER.svg'),
    ES: require('../media/flags/ES.svg'),
    ET: require('../media/flags/ET.svg'),
    FI: require('../media/flags/FI.svg'),
    FJ: require('../media/flags/FJ.svg'),
    FK: require('../media/flags/FK.svg'),
    FM: require('../media/flags/FM.svg'),
    FO: require('../media/flags/FO.svg'),
    FR: require('../media/flags/FR.svg'),
    GA: require('../media/flags/GA.svg'),
    GB: require('../media/flags/GB.svg'),
    GD: require('../media/flags/GD.svg'),
    GE: require('../media/flags/GE.svg'),
    GF: require('../media/flags/GF.svg'),
    GG: require('../media/flags/GG.svg'),
    GH: require('../media/flags/GH.svg'),
    GI: require('../media/flags/GI.svg'),
    GL: require('../media/flags/GL.svg'),
    GM: require('../media/flags/GM.svg'),
    GN: require('../media/flags/GN.svg'),
    GP: require('../media/flags/GP.svg'),
    GQ: require('../media/flags/GQ.svg'),
    GR: require('../media/flags/GR.svg'),
    GT: require('../media/flags/GT.svg'),
    GU: require('../media/flags/GU.svg'),
    GW: require('../media/flags/GW.svg'),
    GY: require('../media/flags/GY.svg'),
    HK: require('../media/flags/HK.svg'),
    HM: require('../media/flags/HM.svg'),
    HN: require('../media/flags/HN.svg'),
    HR: require('../media/flags/HR.svg'),
    HT: require('../media/flags/HT.svg'),
    HU: require('../media/flags/HU.svg'),
    ID: require('../media/flags/ID.svg'),
    IE: require('../media/flags/IE.svg'),
    IL: require('../media/flags/IL.svg'),
    IM: require('../media/flags/IM.svg'),
    IN: require('../media/flags/IN.svg'),
    IO: require('../media/flags/IO.svg'),
    IQ: require('../media/flags/IQ.svg'),
    IR: require('../media/flags/IR.svg'),
    IS: require('../media/flags/IS.svg'),
    IT: require('../media/flags/IT.svg'),
    JE: require('../media/flags/JE.svg'),
    JM: require('../media/flags/JM.svg'),
    JO: require('../media/flags/JO.svg'),
    JP: require('../media/flags/JP.svg'),
    KE: require('../media/flags/KE.svg'),
    KG: require('../media/flags/KG.svg'),
    KH: require('../media/flags/KH.svg'),
    KI: require('../media/flags/KI.svg'),
    KM: require('../media/flags/KM.svg'),
    KN: require('../media/flags/KN.svg'),
    KP: require('../media/flags/KP.svg'),
    KR: require('../media/flags/KR.svg'),
    KW: require('../media/flags/KW.svg'),
    KY: require('../media/flags/KY.svg'),
    KZ: require('../media/flags/KZ.svg'),
    LA: require('../media/flags/LA.svg'),
    LB: require('../media/flags/LB.svg'),
    LC: require('../media/flags/LC.svg'),
    LI: require('../media/flags/LI.svg'),
    LK: require('../media/flags/LK.svg'),
    LR: require('../media/flags/LR.svg'),
    LS: require('../media/flags/LS.svg'),
    LT: require('../media/flags/LT.svg'),
    LU: require('../media/flags/LU.svg'),
    LV: require('../media/flags/LV.svg'),
    LY: require('../media/flags/LY.svg'),
    MA: require('../media/flags/MA.svg'),
    MC: require('../media/flags/MC.svg'),
    MD: require('../media/flags/MD.svg'),
    ME: require('../media/flags/ME.svg'),
    MF: require('../media/flags/MF.svg'),
    MG: require('../media/flags/MG.svg'),
    MH: require('../media/flags/MH.svg'),
    MK: require('../media/flags/MK.svg'),
    ML: require('../media/flags/ML.svg'),
    MM: require('../media/flags/MM.svg'),
    MN: require('../media/flags/MN.svg'),
    MO: require('../media/flags/MO.svg'),
    MP: require('../media/flags/MP.svg'),
    MQ: require('../media/flags/MQ.svg'),
    MR: require('../media/flags/MR.svg'),
    MS: require('../media/flags/MS.svg'),
    MT: require('../media/flags/MT.svg'),
    MU: require('../media/flags/MU.svg'),
    MV: require('../media/flags/MV.svg'),
    MW: require('../media/flags/MW.svg'),
    MX: require('../media/flags/MX.svg'),
    MY: require('../media/flags/MY.svg'),
    MZ: require('../media/flags/MZ.svg'),
    NA: require('../media/flags/NA.svg'),
    NC: require('../media/flags/NC.svg'),
    NE: require('../media/flags/NE.svg'),
    NF: require('../media/flags/NF.svg'),
    NG: require('../media/flags/NG.svg'),
    NI: require('../media/flags/NI.svg'),
    NL: require('../media/flags/NL.svg'),
    NO: require('../media/flags/NO.svg'),
    NP: require('../media/flags/NP.svg'),
    NR: require('../media/flags/NR.svg'),
    NU: require('../media/flags/NU.svg'),
    NZ: require('../media/flags/NZ.svg'),
    OM: require('../media/flags/OM.svg'),
    PA: require('../media/flags/PA.svg'),
    PE: require('../media/flags/PE.svg'),
    PF: require('../media/flags/PF.svg'),
    PG: require('../media/flags/PG.svg'),
    PH: require('../media/flags/PH.svg'),
    PK: require('../media/flags/PK.svg'),
    PL: require('../media/flags/PL.svg'),
    PM: require('../media/flags/PM.svg'),
    PN: require('../media/flags/PN.svg'),
    PR: require('../media/flags/PR.svg'),
    PS: require('../media/flags/PS.svg'),
    PT: require('../media/flags/PT.svg'),
    PW: require('../media/flags/PW.svg'),
    PY: require('../media/flags/PY.svg'),
    QA: require('../media/flags/QA.svg'),
    RE: require('../media/flags/RE.svg'),
    RO: require('../media/flags/RO.svg'),
    RS: require('../media/flags/RS.svg'),
    RU: require('../media/flags/RU.svg'),
    RW: require('../media/flags/RW.svg'),
    SA: require('../media/flags/SA.svg'),
    SB: require('../media/flags/SB.svg'),
    SC: require('../media/flags/SC.svg'),
    SD: require('../media/flags/SD.svg'),
    SE: require('../media/flags/SE.svg'),
    SG: require('../media/flags/SG.svg'),
    SH: require('../media/flags/SH.svg'),
    SI: require('../media/flags/SI.svg'),
    SJ: require('../media/flags/SJ.svg'),
    SK: require('../media/flags/SK.svg'),
    SL: require('../media/flags/SL.svg'),
    SM: require('../media/flags/SM.svg'),
    SN: require('../media/flags/SN.svg'),
    SO: require('../media/flags/SO.svg'),
    SR: require('../media/flags/SR.svg'),
    SS: require('../media/flags/SS.svg'),
    ST: require('../media/flags/ST.svg'),
    SV: require('../media/flags/SV.svg'),
    SX: require('../media/flags/SX.svg'),
    SY: require('../media/flags/SY.svg'),
    SZ: require('../media/flags/SZ.svg'),
    TC: require('../media/flags/TC.svg'),
    TD: require('../media/flags/TD.svg'),
    TG: require('../media/flags/TG.svg'),
    TH: require('../media/flags/TH.svg'),
    TJ: require('../media/flags/TJ.svg'),
    TK: require('../media/flags/TK.svg'),
    TL: require('../media/flags/TL.svg'),
    TM: require('../media/flags/TM.svg'),
    TN: require('../media/flags/TN.svg'),
    TO: require('../media/flags/TO.svg'),
    TR: require('../media/flags/TR.svg'),
    TT: require('../media/flags/TT.svg'),
    TV: require('../media/flags/TV.svg'),
    TW: require('../media/flags/TW.svg'),
    TZ: require('../media/flags/TZ.svg'),
    UA: require('../media/flags/UA.svg'),
    UG: require('../media/flags/UG.svg'),
    US: require('../media/flags/US.svg'),
    UY: require('../media/flags/UY.svg'),
    UZ: require('../media/flags/UZ.svg'),
    VA: require('../media/flags/VA.svg'),
    VC: require('../media/flags/VC.svg'),
    VE: require('../media/flags/VE.svg'),
    VG: require('../media/flags/VG.svg'),
    VI: require('../media/flags/VI.svg'),
    VN: require('../media/flags/VN.svg'),
    VU: require('../media/flags/VU.svg'),
    WF: require('../media/flags/WF.svg'),
    WS: require('../media/flags/WS.svg'),
    YE: require('../media/flags/YE.svg'),
    YT: require('../media/flags/YT.svg'),
    ZA: require('../media/flags/ZA.svg'),
    ZM: require('../media/flags/ZM.svg'),
    ZW: require('../media/flags/ZW.svg')
  } as AssociativeStringType

  protected readonly intl: GeoIntl

  constructor (code?: GeoCodeType) {
    super(code)
    this.intl = new GeoIntl(this.code)
  }

  get (code?: GeoCodeType): FlagReturnType {
    return computed(() => {
      const value = code === undefined
        ? this.code.value
        : isRef(code)
          ? code.value
          : code
      const data = Geo.getDataByCode(value)

      if (data) {
        return {
          icon: GeoFlag.flags[data.country] || '',
          country: this.getCountry(data),
          language: this.getLanguage(data),
          value: Geo.toCode(data) || ''
        }
      } else {
        return undefined
      }
    })
  }

  private getCountry (data: GeoType | undefined): string {
    return data ? this.intl.countryName(data.country).value as string : ''
  }

  getFlag (code?: GeoCodeType): ComputedRef<string> {
    return computed(() => this.get(code).value?.icon || '')
  }

  private getLanguage (data: GeoType | undefined): string {
    return data ? this.intl.language(data.language).value as string : ''
  }

  getList (codes: GeoCodeType[]): (FlagReturnType | undefined)[] {
    return forEach<GeoCodeType, string, FlagReturnType>(codes, code => this.get(code))
  }

  static getNational (codes: GeoCodeType[]): (FlagReturnType | undefined)[] {
    return forEach<GeoCodeType, string, FlagReturnType>(codes, code => new GeoFlag(code).get())
  }
}
