#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetUconfigRegOffsetDef {
    static constexpr std::uint8_t opcode = 0x6a;
    static constexpr std::string_view name = "IT_SET_UCONFIG_REG_OFFSET";
    static constexpr std::string_view desc = "Set base offset index for subsequent user config register writes";
};
}
