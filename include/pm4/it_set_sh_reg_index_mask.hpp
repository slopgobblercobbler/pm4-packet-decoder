#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegIndexMaskDef {
    static constexpr std::uint8_t opcode = 0x4e;
    static constexpr std::string_view name = "IT_SET_SH_REG_INDEX_MASK";
    static constexpr std::string_view desc = "Masked shader register write with index offset";
};
}
